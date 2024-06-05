import { U, UniNodeTypeReference, type IUniNodeOperation } from "@unispec/core";
import { CastIterable } from "../-Helpers";

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
          const FindByIdOperation = U.Operation({
            name: findById.name,

            description: `Operação '${findById.name}'.`,

            meta: {
              gql: {
                kind: "query",
              },
            },

            input: {
              params: {
                id: UniNodeTypeReference({ targetsTo: findById.input, objectProperty: "id" }),
              },
            },

            output: {
              success: U.Reference({
                targetsTo: findById.output,
                description: `Corpo de resposta da operação ${findById.name}.`,
              }),
            },
          });

          yield FindByIdOperation;

          if (create) {
            const CreateOperation = U.Operation({
              name: create.name,

              description: `Operação '${create.name}'.`,

              meta: {
                gql: {
                  kind: "mutation",
                },
              },

              input: {
                body: U.Reference({
                  targetsTo: create.input,
                  description: `Corpo de entrada da operação '${create.name}'.`,
                }),
              },

              output: {
                success: U.Reference({
                  targetsTo: findById.output,
                  description: `Corpo de resposta da operação ${create.name}.`,
                }),
              },
            });

            yield CreateOperation;
          }

          if (updateById) {
            const UpdateOperation = U.Operation({
              name: updateById.name,

              description: "Update operation",

              meta: {
                gql: {
                  kind: "mutation",
                },
              },

              input: {
                params: {
                  ...FindByIdOperation.input.params,
                },
                body: U.Reference({
                  targetsTo: updateById.input,
                  description: "Data to update",
                }),
              },

              output: {
                success: U.Reference({
                  targetsTo: findById.output,
                  description: "Updated data",
                }),
              },
            });

            yield UpdateOperation;
          }

          if (deleteById) {
            const DeleteByIdOperation = U.Operation({
              name: deleteById.name,

              description: `Operação '${deleteById.name}'.`,

              meta: {
                gql: {
                  kind: "mutation",
                },
              },

              input: {
                params: {
                  ...FindByIdOperation.input.params,
                },
              },

              output: {
                success: U.Boolean(),
              },
            });

            yield DeleteByIdOperation;
          }

          if (list) {
            const ListOperation = U.Operation({
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
                      U.String({
                        description: `Filtro '${param}'`,
                        required: false,
                      }),
                    ]),
                  ),
                },
              },

              output: {
                success: U.Reference({
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

export const CompileOperationViews = function* (node: IUniNodeOperation) {
  const input = node.input;

  const output = node.output;
  const outputSuccess = output?.success;

  const OperationInputView = U.View({
    name: `${node.name}OperationCombinedInput`,
    description: `Dados de entrada combinados`,
    type: U.Object({
      properties: {
        params: U.Object({ properties: input?.params ?? {} }),
        queries: U.Object({ properties: input?.queries ?? {} }),
        ...(input?.body
          ? {
              body: typeof input.body === "string" ? U.Reference({ targetsTo: input.body }) : input.body,
            }
          : {}),
      },
    }),
  });

  yield OperationInputView;

  const OperationSuccessView = U.View({
    name: `${node.name}OperationSuccessOutput`,
    description: `Dados de saída da operação.`,
    type: U.Object({
      properties: {
        ...(outputSuccess
          ? {
              body: typeof outputSuccess === "string" ? U.Reference({ targetsTo: outputSuccess }) : outputSuccess,
            }
          : {}),
      },
    }),
  });

  yield OperationSuccessView;
};

export const CompileOperationsViews = function* (nodes: Iterable<IUniNodeOperation>) {
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
