import type { IUniNode} from "@unispec/core";
import { IsUniNodeView } from "@unispec/core";
import type { IResolveTokenName } from "../ResolveTokenName";
import { CreateResolveTokenName } from "../ResolveTokenName";
import type { IBuildAliasedTypeOptions } from "./BuildAliasedType";
import { BuildAliasedType } from "./BuildAliasedType";
import type { IBuildTypeOptions } from "./BuildType";
import { BuildType } from "./BuildType";

export type ITypeScriptGeneratorBuildAliasedTypeOptions = Pick<IBuildAliasedTypeOptions, "mod" | "export">;

export class TypeScriptGenerator {
  constructor(readonly resolveTokenName: IResolveTokenName = CreateResolveTokenName()) {}

  public buildType(node: IUniNode) {
    const buildTypeOptions: IBuildTypeOptions = {
      resolveTokenName: this.resolveTokenName,
    };

    return BuildType(buildTypeOptions)(node);
  }

  public buildAliasedType(node: IUniNode, extraOptions: ITypeScriptGeneratorBuildAliasedTypeOptions) {
    const buildAliasedTypeOptions: IBuildAliasedTypeOptions = {
      resolveTokenName: this.resolveTokenName,
      ...extraOptions,
    };

    return BuildAliasedType(buildAliasedTypeOptions)(node);
  }

  public *buildAliasedTypes(nodes: Iterable<IUniNode>, extraOptions: ITypeScriptGeneratorBuildAliasedTypeOptions) {
    for (const node of nodes) {
      switch (node.kind) {
        case "type":
        case "view":
        case "operation": {
          try {
            if (IsUniNodeView(node)) {
              const aliasedType = this.buildAliasedType(node, extraOptions);
              yield { node, success: true, error: null, aliasedType };
            }
          } catch (error) {
            yield { node, success: false, error, aliasedType: null };
          }

          break;
        }

        default: {
          break;
        }
      }
    }
  }
}
