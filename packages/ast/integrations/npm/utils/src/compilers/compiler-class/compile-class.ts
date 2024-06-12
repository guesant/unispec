import { CheckNamedBase } from "@unispec/ast-builder";
import { type IUniNode } from "@unispec/ast-types";
import { __decorate, __metadata } from "tslib";
import { UniRepository } from "../../repository";
import type { CompileClassHandler } from "./compile-class-handler";
import type { ICompileClassContext } from "./compile-class-typings";

export class CompileClass {
  #handlers = new Set<CompileClassHandler>();

  constructor(
    public repository: UniRepository = new UniRepository(),
    handlers?: Iterable<CompileClassHandler>,
    public dtoClassesMap = new Map<string, object>(),
  ) {
    this.AddHandlers(handlers);
  }

  AddHandler(handler?: CompileClassHandler | null) {
    if (handler) {
      this.#handlers.add(handler);
    }
    return this;
  }

  AddHandlers(handlers?: CompileClassHandler | Iterable<CompileClassHandler> | null) {
    if (handlers) {
      if (Symbol.iterator in handlers) {
        for (const handler of handlers) {
          this.AddHandler(handler);
        }
      } else {
        this.AddHandler(handlers);
      }
    }

    return this;
  }

  GetNodeName(context: ICompileClassContext) {
    if (CheckNamedBase(context.node)) {
      return context.node.name;
    }

    return null;
  }

  CompileCtor(node: IUniNode, parent?: string | null, meta?: Record<string, any>) {
    const context: ICompileClassContext = {
      node,
      //
      meta,
      //
      host: this,
      repository: this.repository,
      dtoClassesMap: this.dtoClassesMap,
      //
      ctorDecorators: [],
      properties: {},
      //
      EnsureProperty(property) {
        if (!this.properties[property]) {
          this.properties[property] = {
            designType: Object,
            decorators: [],
          };
        }
        return this;
      },
      AddCtorDecorator(ctorDecorator) {
        this.ctorDecorators.push(ctorDecorator);
        return context;
      },
      AddCtorDecorators(ctorDecorators) {
        for (const decorator of ctorDecorators) {
          this.AddCtorDecorator(decorator);
        }
        return context;
      },
      AddPropertyDecorator(property, propertyDecorator) {
        this.EnsureProperty(property);

        this.properties[property].decorators.push(propertyDecorator);

        return context;
      },

      AddPropertyDecorators(property, propertyDecorators) {
        for (const decorator of propertyDecorators) {
          this.AddPropertyDecorator(property, decorator);
        }

        return context;
      },

      SetPropertyDesignType(property, designType) {
        this.EnsureProperty(property);
        this.properties[property].designType = designType;
        return this;
      },
    };

    const dtoClassName = this.GetNodeName(context);

    if (dtoClassName === null) {
      return null;
    }

    if (context.dtoClassesMap && context.dtoClassesMap.has(dtoClassName)) {
      return context.dtoClassesMap.get(dtoClassName);
    }

    function CompiledClassCtor() {}

    context.dtoClassesMap?.set(dtoClassName, CompiledClassCtor);

    for (const handler of this.#handlers) {
      handler.HandleCtor(context);
    }

    const handleContext = Object.freeze({
      ...context,
      className: dtoClassName,
    });

    // for (const handle of this.#handlers) {
    //   const handlerClassDecorators = handle.compileCtorDecorators(handleContext);

    //   if (handlerClassDecorators) {
    //     for (const handlerClassDecorator of handlerClassDecorators) {
    //       context.ctorDecorators.push(handlerClassDecorator);
    //     }
    //   }
    // }

    // if (CheckView(node)) {
    //   const type = node.type;

    //   const typeRealTarget = type && this.repository.GetRealTarget(type);

    //   if (CheckTypeObject(typeRealTarget)) {
    //     for (const propertyKey in typeRealTarget.properties) {
    //       const propertyNode = typeRealTarget.properties[propertyKey];

    //       const propertyContext = Object.freeze({
    //         ...context,
    //         parent,
    //         propertyKey,
    //         propertyNode,
    //         className: dtoClassName,
    //       });

    //       const compiledProperty = this.CompileProperty(propertyContext, parent);

    //       if (compiledProperty !== null) {
    //         const name = compiledProperty.name;

    //         const propertyDecorators = [
    //           //
    //           ...compiledProperty.propertyDecorators,
    //           __metadata("design:type", compiledProperty.designType),
    //         ];

    //         __decorate(propertyDecorators, CompiledClassCtor.prototype, name, void 0);
    //       }
    //     }
    //   }
    // }

    for (const handler of this.#handlers) {
      handler.HandleCtor(context, parent);
    }

    for (const [propertyKey, propertyOptions] of Object.entries(context.properties)) {
      const propertyDecorators = [
        //
        ...propertyOptions.decorators,
        __metadata("design:type", propertyOptions.designType),
      ];

      __decorate(propertyDecorators, CompiledClassCtor.prototype, propertyKey, void 0);
    }

    const decoratedClass = __decorate(context.ctorDecorators, CompiledClassCtor);

    Object.defineProperty(CompiledClassCtor, "name", { value: dtoClassName });

    return decoratedClass;
  }

  // CompileProperty(context: ICompileClassHandlerPropertyContext, parent?: string | null) {
  //   const propertyDecorators = [];

  //   const propertyContext = Object.freeze({ ...context });

  //   for (const handle of this.#handlers) {
  //     const handlePropertyDecorators = handle.compilePropertyDecorators(propertyContext, parent ? `${parent}.${propertyContext.propertyKey}` : parent);

  //     if (handlePropertyDecorators) {
  //       for (const handlerClassDecorator of handlePropertyDecorators) {
  //         propertyDecorators.push(handlerClassDecorator);
  //       }
  //     }
  //   }

  //   return {
  //     propertyDecorators,
  //     designType: Object,
  //     name: context.propertyKey,
  //   };
  // }
}
