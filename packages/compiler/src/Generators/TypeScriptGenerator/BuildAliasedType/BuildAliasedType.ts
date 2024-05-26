import * as U from "@unispec/core";
import { IUniNode } from "@unispec/core";
import { BuildType, IBuildTypeOptions } from "../BuildType";

export type IBuildAliasedTypeOptions = {
  mod: "type" | "interface";
  export: boolean;
  resolveTokenName: (node: IUniNode) => string;
};

export const BuildAliasedType = (options: IBuildAliasedTypeOptions) => (node: IUniNode) => {
  if (U.IsNodeView(node)) {
    const buildTypeOptions: IBuildTypeOptions = {
      resolveTokenName: options.resolveTokenName,
    };

    const builtType = BuildType(buildTypeOptions)(node);

    const tokenName = options.resolveTokenName(node);

    const aliasedType = `type ${tokenName} = ${builtType};`;

    if (options.export) {
      return `export ${aliasedType}`;
    }

    return `${aliasedType}`;
  }

  return null;
};
