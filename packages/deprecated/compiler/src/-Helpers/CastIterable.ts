export type MayBeIterable<T> = T | Iterable<T>;

export const CastIterable = <T extends any>(v: MayBeIterable<T>): Iterable<T> => {
  if (v) {
    if (v instanceof Object && Symbol.iterator in v) {
      return v;
    } else {
      return [v];
    }
  }

  return [];
};
