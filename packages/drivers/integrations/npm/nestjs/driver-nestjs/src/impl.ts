import type { UniRepository } from "@unispec/ast-utils";
import { CompileClass, type ICompileClassContext } from "@unispec/ast-utils";
import { pascalCase } from "change-case";
import { NestGraphQlHandler } from "./GraphQl";
import { NestSwaggerHandler } from "./Swagger";

export class NestImpl extends CompileClass {
  constructor(repository: UniRepository, dtoClassesMap = new Map<string, object>()) {
    super(repository, [new NestGraphQlHandler(), new NestSwaggerHandler()], dtoClassesMap);
  }

  GetNodeName(context: ICompileClassContext) {
    const baseName = super.GetNodeName(context);

    if (baseName) {
      let dtoClassName = pascalCase(baseName);

      if (context.meta?.mode === "input" && !dtoClassName.toLocaleLowerCase().includes("input")) {
        dtoClassName = `${dtoClassName}Input`;
      }

      if (!dtoClassName.toLocaleLowerCase().includes("dto")) {
        dtoClassName = `${dtoClassName}Dto`;
      }

      return dtoClassName;
    }

    return baseName;
  }
}
