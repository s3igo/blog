export type ExcessPropertyCheck<T extends object, TExpected extends object> = Exclude<
    keyof T,
    keyof TExpected
> extends never
    ? T
    : never;

export type Prettify<T extends object> = { [K in keyof T]: T[K] };

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const isNever = <_ extends never>(): void => {};

export type Companion<T, U> = {
    new: (value: T) => U;
};

// usecase: type T = string & { readonly brand: unique symbol };
export const newType = <T, U extends T & { readonly brand: symbol }>(value: T): U =>
    value as unknown as U;

if (import.meta.vitest) {
    const { describe, expect, test } = import.meta.vitest;

    describe('newType', () => {
        test('string', () => {
            const a = newType('a');
            const b = newType('b');
            expect(a).toBe('a');
            expect(b).toBe('b');
        });
        test('number', () => {
            const a = newType(1);
            const b = newType(2);
            expect(a).toBe(1);
            expect(b).toBe(2);
        });
    });
}
