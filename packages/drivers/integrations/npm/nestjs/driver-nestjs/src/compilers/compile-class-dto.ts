import { CompileClass, type ICompileClassContext } from "@unispec/ast-utils";
import { pascalCase } from "change-case";

export class CompileClassDto extends CompileClass {
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
