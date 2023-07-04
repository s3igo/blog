// export type ExcessPropertyCheck<T extends object, TExpected extends object> = Exclude<
//     keyof T,
//     keyof TExpected
// > extends never
//     ? T
//     : never;

export type Prettify<T extends object> = { [K in keyof T]: T[K] };

/**
 * コンパニオンオブジェクトパターンでコンストラクタを注釈するための型
 * @param T コンストラクタの引数の型
 * @param U コンストラクタの戻り値の型
 */
export type Companion<T, U> = {
    new: (value: T) => U;
};

/**
 * Opaque型を作成する
 * @param T Opaque型の元になる型
 * @param U Opaque型のBrand
 * @example type A = Opaque<string, 'A'>;
 */
export type Opaque<T extends NonNullable<unknown>, U extends string> = T & {
    [P in U as `_${P}Brand`]: never;
};

/**
 * Opaque型とそれに付与したBrandから元の型を取り出す
 * @param T Opaque型のtype alias
 * @param U Opaque型のBrand
 * @example type A = Opaque<string, 'A'>;
 *     type B = InferBase<A, 'A'>; //=> string
 */
type InferBase<T, U extends string> = T extends infer V & { [K in `_${U}Brand`]: never }
    ? V
    : never;

/**
 * @example const a = Opaque.create<A, 'A'>('foo');
 *     type B = Opaque<string, 'B'>;
 *     const b: B = a; // Error
 *     const c: string = a; // OK
 */
export const Opaque = {
    /**
     * Opaque型の値を作成する
     * @constructor
     * @param T Opaque<T, U>によって作成した型
     * @param U Opaque<T, U>によって作成した型のBrand
     * @param v 作成する型の値
     * @example type A = Opaque<string, 'A'>;
     *     const a = Opaque.create<A, 'A'>('foo');
     *     type B = Opaque<string, 'B'>;
     *     const b: B = a; // Error
     *     const c: string = a; // OK
     */
    create: <T, U extends string>(v: InferBase<T, U>) => v as unknown as T,
};

if (import.meta.vitest) {
    const { describe, expect, test } = import.meta.vitest;

    describe('Opaque.create()', () => {
        test('Opaque.create()', () => {
            type A = Opaque<string, 'A'>;
            const a = Opaque.create<A, 'A'>('a');
            expect(a).toBe('a');
        });
        test('Opaque.create() with number', () => {
            type A = Opaque<number, 'A'>;
            const a = Opaque.create<A, 'A'>(1);
            expect(a).toBe(1);
        });
        test('Opaque.create() with object', () => {
            type A = Opaque<{ a: string }, 'A'>;
            const a = Opaque.create<A, 'A'>({ a: 'a' });
            expect(a).toEqual({ a: 'a' });
        });
    });
}
