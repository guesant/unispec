import { U, UniNodeTypeReference } from "@unispec/core";

type ICompiledSpecification = {
  operations: U.IOperation[];
};

const CompileDeclaratorOperations = function* (node: U.IDeclarator): Iterable<U.IOperation> {
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

            description: "Find by id.",

            input: {
              params: {
                id: UniNodeTypeReference({ targetsTo: findById.input, objectProperty: "id" }),
              },
            },

            output: {
              success: U.Reference({
                targetsTo: findById.output,
                description: "Output success.",
              }),
            },
          });

          yield FindByIdOperation;

          if (create) {
            const CreateOperation = U.Operation({
              name: create.name,

              description: "Create.",

              input: {
                body: U.Reference({
                  targetsTo: create.input,
                  description: "",
                }),
              },

              output: {
                success: U.Reference({
                  targetsTo: findById.output,
                  description: "Created data.",
                }),
              },
            });

            yield CreateOperation;
          }

          if (updateById) {
            const UpdateOperation = U.Operation({
              name: updateById.name,

              description: "Update operation",

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

              description: "Delete by ID",

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

              description: "List",

              input: {
                params: {},
              },

              output: {
                success: U.Reference({
                  targetsTo: list.view,
                  description: "List result",
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

const CompileOperations = function* (nodes: Iterable<U.INode>): Iterable<U.IOperation> {
  for (const node of nodes) {
    if (node.kind === "operation") {
      yield node;
    }

    if (node.kind === "declarator") {
      yield* CompileDeclaratorOperations(node);
    }
  }
};

export const Compile = (nodes: Iterable<U.INode>) => {
  const operations = new Set<U.IOperation>(CompileOperations(nodes));

  const compiled: ICompiledSpecification = {
    operations: Array.from(operations),
  };

  return compiled;
};
