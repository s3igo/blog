export type ExcessPropertyCheck<T extends object, TExpected extends object> = Exclude<
    keyof T,
    keyof TExpected
> extends never
    ? T
    : never;

export type Prettify<T extends object> = { [K in keyof T]: T[K] };

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const isNever = <_ extends never>(): void => {};
