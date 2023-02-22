export type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};

export type NonEmptyArray<T> = [T, ...T[]];
