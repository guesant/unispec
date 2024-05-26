import { describe, expect, it } from "vitest";
import { IUniNodeBase, UniNodeBase } from "./-Base";

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
