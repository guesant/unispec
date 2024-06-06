import { describe, expect, it } from "vitest";
import { DefaultNodesValuesFixture } from "../../Fixtures";
import { UniNodeDeclarator, type IUniNodeDeclarator } from "./Declarator";

describe("UniNodeDeclarator", () => {
  it("should return default values when no options provided", () => {
    expect(UniNodeDeclarator()).toEqual({ ...DefaultNodesValuesFixture.UniDeclaratorFixtures.defaultValues });
    expect(UniNodeDeclarator({})).toEqual({ ...DefaultNodesValuesFixture.UniDeclaratorFixtures.defaultValues });
  });

  it("should return default values with extra provided values", () => {
    type NewType = IUniNodeDeclarator & { x: true };

    expect(
      UniNodeDeclarator(<NewType>{
        x: true,
      }),
    ).toEqual({
      ...DefaultNodesValuesFixture.UniDeclaratorFixtures.defaultValues,
      x: true,
    });
  });

  it("should override default values", () => {
    type NewType = IUniNodeDeclarator & { x: true };
    expect(
      UniNodeDeclarator(<NewType>{
        kind: "declarator",
        x: true,
      }),
    ).toEqual({
      ...DefaultNodesValuesFixture.UniDeclaratorFixtures.defaultValues,
      kind: "declarator",
      x: true,
    });
  });
});
