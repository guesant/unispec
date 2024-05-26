import { U } from "@unispec/core";

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
            name: `${node.entity}UpdateById`,

            description: "",

            input: {
              params: {},
            },

            output: {
              success: U.Reference({
                targetsTo: findById.output,
                description: "",
              }),
            },
          });

          yield FindByIdOperation;

          if (create) {
            const CreateOperation = U.Operation({
              name: `${node.entity}Create`,

              description: "",

              input: {
                body: U.Reference({
                  targetsTo: create,
                  description: "",
                }),
              },

              output: {
                success: U.Reference({
                  targetsTo: findById.output,
                  description: "",
                }),
              },
            });

            yield CreateOperation;
          }

          if (updateById) {
            const UpdateOperation = U.Operation({
              name: `${node.entity}UpdateById`,

              description: "",

              input: {
                params: {},
                body: U.Reference({
                  targetsTo: updateById,
                  description: "",
                }),
              },

              output: {
                success: U.Reference({
                  targetsTo: findById.output,
                  description: "",
                }),
              },
            });

            yield UpdateOperation;
          }

          if (deleteById) {
            const DeleteByIdOperation = U.Operation({
              name: `${node.entity}DeleteById`,

              description: "",

              input: {
                params: {},
                body: U.Reference({
                  targetsTo: deleteById,
                  description: "",
                }),
              },

              output: {
                success: U.Reference({
                  targetsTo: findById.output,
                  description: "",
                }),
              },
            });

            yield DeleteByIdOperation;
          }

          if (list) {
            const ListOperation = U.Operation({
              name: `${node.entity}List`,

              description: "",

              input: {
                params: {},
              },

              output: {
                success: U.Reference({
                  targetsTo: list.view,
                  description: "",
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
