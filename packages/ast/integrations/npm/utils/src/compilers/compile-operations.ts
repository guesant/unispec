import { BuildOperation, BuildTypeBoolean, BuildTypeObject, BuildTypeReference, BuildTypeString, BuildView } from "@unispec/ast-builder";
import * as U from "@unispec/ast-types";
import { CastIterable } from "../helpers";

export type ICompiledSpecification = {
  operations: U.IOperation[];
  views: U.IView[];

  nodes: Iterable<U.IOperation | U.IView>;
};

export const CompileDeclaratorOperations = function* (node: U.IDeclarator): Iterable<U.IOperation> {
  if (node.kind === "declarator") {
    const nodeOperations = node.operations;

    if (nodeOperations) {
      const crud = nodeOperations.crud;

      if (crud) {
        const findById = crud.findById;

        const list = crud.list;
        const create = crud.create;
        const updateById = crud.updateById;
        const deleteById = crud.deleteById;

        if (findById) {
          const FindByIdOperation = BuildOperation({
            name: findById.name,

            description: `Operação '${findById.name}'.`,

            meta: {
              gql: {
                kind: "query",
              },
            },

            input: {
              params: {
                id: BuildTypeReference({ targetsTo: findById.input, objectProperty: "id" }),
              },
            },

            output: {
              success: BuildTypeReference({
                targetsTo: findById.output,
                description: `Corpo de resposta da operação ${findById.name}.`,
              }),
            },
          });

          yield FindByIdOperation;

          if (create) {
            const CreateOperation = BuildOperation({
              name: create.name,

              description: `Operação '${create.name}'.`,

              meta: {
                gql: {
                  kind: "mutation",
                },
              },

              input: {
                body: BuildTypeReference({
                  targetsTo: create.input,
                  description: `Corpo de entrada da operação '${create.name}'.`,
                }),
              },

              output: {
                success: BuildTypeReference({
                  targetsTo: findById.output,
                  description: `Corpo de resposta da operação ${create.name}.`,
                }),
              },
            });

            yield CreateOperation;
          }

          if (updateById) {
            const UpdateOperation = BuildOperation({
              name: updateById.name,

              description: "Update operation",

              meta: {
                gql: {
                  kind: "mutation",
                },
              },

              input: {
                params: {
                  ...FindByIdOperation.input!.params,
                },
                body: BuildTypeReference({
                  targetsTo: updateById.input,
                  description: "Data to update",
                }),
              },

              output: {
                success: BuildTypeReference({
                  targetsTo: findById.output,
                  description: "Updated data",
                }),
              },
            });

            yield UpdateOperation;
          }

          if (deleteById) {
            const DeleteByIdOperation = BuildOperation({
              name: deleteById.name,

              description: `Operação '${deleteById.name}'.`,

              meta: {
                gql: {
                  kind: "mutation",
                },
              },

              input: {
                params: {
                  ...FindByIdOperation.input!.params,
                },
              },

              output: {
                success: BuildTypeBoolean(),
              },
            });

            yield DeleteByIdOperation;
          }

          if (list) {
            const ListOperation = BuildOperation({
              name: list.name,

              description: `Operação '${list.name}'.`,

              meta: {
                gql: {
                  kind: "query",
                },
              },

              input: {
                params: {
                  ...Object.fromEntries(
                    (list.filters ?? [])?.map(([param]) => [
                      param,
                      BuildTypeString({
                        description: `Filtro '${param}'`,
                        required: false,
                      }),
                    ]),
                  ),
                },
              },

              output: {
                success: BuildTypeReference({
                  targetsTo: list.view,
                  description: `Corpo de resposta da operação ${list.name}.`,
                }),
              },
            });

            yield ListOperation;
          }
        }
      }
    }
  }
};

export const CompileOperationViews = function* (node: U.IUniNodeOperation) {
  const input = node.input;

  const output = node.output;
  const outputSuccess = output?.success;

  const OperationInputView = BuildView({
    name: `${node.name}CombinedInput`,
    description: `Dados de entrada combinados.`,
    type: BuildTypeObject({
      properties: {
        ...(input?.params
          ? {
              params: BuildTypeObject({ properties: input?.params }),
            }
          : {}),
        ...(input?.queries
          ? {
              queries: BuildTypeObject({ properties: input?.queries }),
            }
          : {}),
        ...(input?.body
          ? {
              body: typeof input.body === "string" ? BuildTypeReference({ targetsTo: input.body }) : input.body,
            }
          : {}),
      },
    }),
  });

  yield OperationInputView;

  const OperationSuccessView = BuildView({
    name: `${node.name}CombinedSuccessOutput`,
    description: `Dados de saída da operação.`,
    type: BuildTypeObject({
      properties: {
        ...(outputSuccess
          ? {
              body: typeof outputSuccess === "string" ? BuildTypeReference({ targetsTo: outputSuccess }) : outputSuccess,
            }
          : {}),
      },
    }),
  });

  yield OperationSuccessView;
};

export const CompileOperationsViews = function* (nodes: Iterable<U.IUniNodeOperation>) {
  for (const node of nodes) {
    yield* CompileOperationViews(node);
  }
};

export const CompileOperations = function* (nodes: Iterable<U.INode>): Iterable<U.IOperation> {
  for (const node of nodes) {
    if (node.kind === "operation") {
      yield node;
    }

    if (node.kind === "declarator") {
      yield* CompileDeclaratorOperations(node);
    }
  }
};

export const CompileSpecification = (nodes: U.INode | Iterable<U.INode>) => {
  const operations = new Set<U.IOperation>(CompileOperations(CastIterable(nodes)));

  const compiled: ICompiledSpecification = {
    operations: Array.from(operations),
    views: Array.from(CompileOperationsViews(operations)),

    get nodes() {
      function* nodesGerator() {
        yield* compiled.operations;
        yield* compiled.views;
      }

      return nodesGerator();
    },
  };

  return compiled;
};
