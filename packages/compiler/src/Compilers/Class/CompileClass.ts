import { IsUniNodeObjectLike, IsUniNodeView, type IUniNode } from "@unispec/core";
import { __decorate, __metadata } from "tslib";
import { UniRepository } from "../../Repository";
import { CompileClassHandler, type ICompileClassHandlerPropertyContext } from "./CompileClassHandler";

export interface ICompileClassContext {
  node: IUniNode;

  host: CompileClass;

  meta?: Record<string, any>;
  dtoClassesMap: Map<string, any>;
}

export class CompileClass {
  #handlers = new Set<CompileClassHandler>();

  constructor(
    public repository: UniRepository = new UniRepository(),
    handlers?: Iterable<CompileClassHandler>,
    public dtoClassesMap = new Map<string, object>(),
  ) {
    this.AddHandlers(handlers);
  }

  AddHandlers(handlers?: CompileClassHandler | Iterable<CompileClassHandler> | null) {
    if (handlers) {
      if (Symbol.iterator in handlers) {
        for (const handler of handlers) {
          this.#handlers.add(handler);
        }
      } else {
        this.#handlers.add(handlers);
      }
    }

    return this;
  }

  GetNodeName(context: ICompileClassContext) {
    if (IsUniNodeView(context.node)) {
      return context.node.name;
    }

    return null;
  }

  CompileCtor(node: IUniNode, parent?: string | null) {
    const context = {
      node,
      host: this,
      repository: this.repository,
      dtoClassesMap: this.dtoClassesMap,
    };

    const dtoClassName = this.GetNodeName(context);

    if (dtoClassName === null) {
      return null;
    }

    if (context.dtoClassesMap && context.dtoClassesMap.has(dtoClassName)) {
      return context.dtoClassesMap.get(dtoClassName);
    }

    function CompiledClassCtor() {}

    const classDecorators = [];

    const handleContext = Object.freeze({
      ...context,
      className: dtoClassName,
    });

    for (const handle of this.#handlers) {
      const handlerClassDecorators = handle.compileCtorDecorators(handleContext);

      if (handlerClassDecorators) {
        for (const handlerClassDecorator of handlerClassDecorators) {
          classDecorators.push(handlerClassDecorator);
        }
      }
    }

    if (IsUniNodeObjectLike(node)) {
      for (const propertyKey in node.properties) {
        const propertyNode = node.properties[propertyKey];

        const propertyContext = Object.freeze({
          ...context,
          parent,
          propertyKey,
          propertyNode,
          className: dtoClassName,
        });

        const compiledProperty = this.CompileProperty(propertyContext, parent);

        if (compiledProperty !== null) {
          const name = compiledProperty.name;

          const propertyDecorators = [
            //
            ...compiledProperty.propertyDecorators,
            __metadata("design:type", compiledProperty.designType),
          ];

          __decorate(propertyDecorators, CompiledClassCtor.prototype, name, void 0);
        }
      }
    }

    const decoratedClass = __decorate(classDecorators, CompiledClassCtor);

    Object.defineProperty(CompiledClassCtor, "name", { value: dtoClassName });

    return decoratedClass;
  }

  CompileProperty(context: ICompileClassHandlerPropertyContext, parent?: string | null) {
    const propertyDecorators = [];

    const propertyContext = Object.freeze({ ...context });

    for (const handle of this.#handlers) {
      const handlePropertyDecorators = handle.compilePropertyDecorators(propertyContext, parent ? `${parent}.${propertyContext.propertyKey}` : parent);

      if (handlePropertyDecorators) {
        for (const handlerClassDecorator of handlePropertyDecorators) {
          propertyDecorators.push(handlerClassDecorator);
        }
      }
    }

    return {
      propertyDecorators,
      designType: Object,
      name: context.propertyKey,
    };
  }
}
