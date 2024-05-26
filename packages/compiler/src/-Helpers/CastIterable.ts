export const CastIterable = <T extends object>(v: T | Iterable<T>): Iterable<T> => (Symbol.iterator in v ? v : [v]);
