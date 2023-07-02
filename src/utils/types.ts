// export type ExcessPropertyCheck<T extends object, TExpected extends object> = Exclude<
//     keyof T,
//     keyof TExpected
// > extends never
//     ? T
//     : never;

export type Prettify<T extends object> = { [K in keyof T]: T[K] };

// eslint-disable-next-line @typescript-eslint/no-empty-function
// export const isNever = <_ extends never>(): void => {};

/**
 * コンパニオンオブジェクトパターンでコンストラクタを注釈するための型
 * @param T コンストラクタの引数の型
 * @param U コンストラクタの戻り値の型
 */
export type Companion<T, U> = {
    new: (value: T) => U;
};

/**
 * 型引数を省略した場合に推論させない型
 * @param T 対象の型
 * @example const fn = <T>(value: NoInfer<T>): T => value;
 *     const a = fn('a'); // Error
 *     const b = fn<string>('b'); // OK
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type NoInfer<T> = [T][T extends any ? 0 : never];

/**
 * Opaque型を作成するための型
 * @param T Opaque型の元になる型
 * @param U Opaque型のブランド
 * @example type A = Opaque<string, 'A'>;
 */
export type Opaque<T, U extends string> = T & { readonly _brand: U };

/**
 * Opaque型を作成するためのユーティリティ
 * @example const a = Opaque.create<A, string>('a');
 *     type B = Opaque<string, 'B'>;
 *     const b: B = a; // Error
 *     const c: string = a; // OK
 */
export const Opaque = {
    /**
     * Opaque型を作成するコンストラクター
     * @param T Opaque<T, U>によって作成された型
     * @param U 引数vに渡す型
     * @param v 作成する型の値
     * @example const a = Opaque.create<A, string>('a');
     */
    create: <T extends Opaque<U, string>, U = never>(v: NoInfer<U>): T => v as unknown as T,
};

if (import.meta.vitest) {
    const { describe, expect, test } = import.meta.vitest;

    describe('Opaque.create()', () => {
        test('Opaque.create()', () => {
            type A = Opaque<string, 'A'>;
            const a = Opaque.create<A, string>('a');
            expect(a).toBe('a');
        });
        test('Opaque.create() with number', () => {
            type A = Opaque<number, 'A'>;
            const a = Opaque.create<A, number>(1);
            expect(a).toBe(1);
        });
        test('Opaque.create() with object', () => {
            type A = Opaque<{ a: string }, 'A'>;
            const a = Opaque.create<A, { a: string }>({ a: 'a' });
            expect(a).toEqual({ a: 'a' });
        });
    });
}
