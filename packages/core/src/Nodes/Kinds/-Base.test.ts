import { describe, expect, it } from "vitest";
import { IUniNodeBase, UniNodeBase } from "./-Base";

const fixtures = {
  UniNodeTypeBase: {
    defaultValues: {
      kind: "type",
      type: "unknown",
      nullable: false,
      required: true,
      description: "",
      default: undefined,
    },
  },
};

describe("UniNodeBase", () => {
  it("should return default values when no options provided", () => {
    expect(UniNodeBase()).toEqual({ kind: "base" });
    expect(UniNodeBase({})).toEqual({ kind: "base" });
  });

  it("should return default values with extra provided values", () => {
    type NewType = IUniNodeBase & {
      x: true;
    };

    expect(UniNodeBase(<NewType>{ x: true })).toEqual({ kind: "base", x: true });
  });

  it("should override default values", () => {
    type NewType = IUniNodeBase & {
      x: true;
    };

    expect(UniNodeBase(<NewType>{ kind: "custom", x: true })).toEqual({ kind: "custom", x: true });
  });
});

describe("UniNodeTypeBase", () => {
  it("should return default values when no options provided", () => {
    expect(UniNodeTypeBase()).toEqual(fixtures.UniNodeTypeBase.defaultValues);
    expect(UniNodeTypeBase({})).toEqual(fixtures.UniNodeTypeBase.defaultValues);
  });

  it("should return default values with extra provided values", () => {
    type NewType = IUniNodeTypeBase & {
      x: true;
    };

    expect(
      UniNodeTypeBase(<NewType>{
        x: true,
      }),
    ).toEqual({
      ...fixtures.UniNodeTypeBase.defaultValues,
      x: true,
    });
  });

  it("should override default values", () => {
    type NewType = IUniNodeTypeBase & {
      x: true;
    };

    expect(
      UniNodeTypeBase(<NewType>{
        type: "custom",
        x: true,
      }),
    ).toEqual({
      ...fixtures.UniNodeTypeBase.defaultValues,
      type: "custom",
      x: true,
    });
  });
});
