import { describe, expect, it } from "vitest";
import { DefaultNodesValuesFixture } from "../../Fixtures";
import { UniNodeBase, UniNodeTypeBase, type IUniNodeBase, type IUniNodeTypeBase } from "./-Base";

describe("UniNodeBase", () => {
  it("should return default values when no options provided", () => {
    expect(UniNodeBase()).toEqual({
      ...DefaultNodesValuesFixture.UniNodeBaseFixtures.defaultValues,
    });

    expect(UniNodeBase({})).toEqual({
      ...DefaultNodesValuesFixture.UniNodeBaseFixtures.defaultValues,
    });
  });

  it("should return default values with extra provided values", () => {
    type NewType = IUniNodeBase & { x: true };
    expect(UniNodeBase(<NewType>{ x: true })).toEqual({
      ...DefaultNodesValuesFixture.UniNodeBaseFixtures.defaultValues,
      x: true,
    });
  });

  it("should override default values", () => {
    type NewType = IUniNodeBase & { x: true };
    expect(UniNodeBase(<NewType>{ kind: "custom", x: true })).toEqual({ kind: "custom", x: true });
  });
});

describe("UniNodeTypeBase", () => {
  it("should return default values when no options provided", () => {
    expect(UniNodeTypeBase()).toEqual(DefaultNodesValuesFixture.UniNodeTypeBaseFixtures.defaultValues);
    expect(UniNodeTypeBase({})).toEqual(DefaultNodesValuesFixture.UniNodeTypeBaseFixtures.defaultValues);
  });

  it("should return default values with extra provided values", () => {
    type NewType = IUniNodeTypeBase & { x: true };

    expect(UniNodeTypeBase(<NewType>{ x: true })).toEqual({
      ...DefaultNodesValuesFixture.UniNodeTypeBaseFixtures.defaultValues,
      x: true,
    });
  });

  it("should override default values", () => {
    type NewType = IUniNodeTypeBase & { x: true };

    expect(UniNodeTypeBase(<NewType>{ type: "custom", x: true })).toEqual({
      ...DefaultNodesValuesFixture.UniNodeTypeBaseFixtures.defaultValues,
      type: "custom",
      x: true,
    });
  });
});
