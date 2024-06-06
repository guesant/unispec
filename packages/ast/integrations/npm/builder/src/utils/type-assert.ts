/**
 * https://stackoverflow.com/a/73461648
 */

export function TypeAssert<T extends never>() {}

export type TypeEqualityGuard<A, B> = Exclude<A, B> | Exclude<B, A>;
