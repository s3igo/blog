/**
 * コンパニオンオブジェクトパターンでコンストラクタを注釈するための型
 * @param T コンストラクタの引数の型
 * @param U コンストラクタの戻り値の型
 * @example const A: Companion<number, string> = {
 *         new: (value) => value.toString(),
 *     }
 */
export type Companion<T, U> = {
    new: (value: T) => U;
};

/** Brandの名前 */
type BrandName<T extends string> = `_${T}Brand`;

/** never型が露出しないためのtype alias */
type BrandMarker = never;

/**
 * Opaque型を作成する
 * @param T Opaque型の元になる型
 * @param U Opaque型のBrand
 * @example type A = Opaque<string, 'A'>;
 */
export type Opaque<T extends NonNullable<unknown>, U extends string> = T & {
    [P in U as BrandName<U>]: BrandMarker;
};

// TODO: Brandが複数存在する場合に対応
// Brandが複数存在する場合、Brandを作成することはできるがそこから元の型を取り出すことができない

/** Opaque型からBrandを取り出す */
type InferBrand<T> = {
    [K in keyof T]: T[K] extends BrandMarker ? K : never;
}[keyof T]; //=> string | number | symbol

/**
 * Opaque型とそれに付与したBrandから元の型を取り出す
 * @param T Opaque型のtype alias
 * @param U Opaque型のBrand
 * @example type A = Opaque<string, 'A'>;
 *     type B = InferBase<A, 'A'>; //=> string
 */
type InferBase<T, U extends string> = T extends infer V & { [K in BrandName<U>]: BrandMarker }
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
     * @function
     * @param T Opaque<T, U>によって作成した型
     * @param U Opaque<T, U>によって作成した型のBrand
     * @param value 作成する型の値
     * @example type A = Opaque<string, 'A'>;
     *     const a = Opaque.create<A, 'A'>('foo');
     *     type B = Opaque<string, 'B'>;
     *     const b: B = a; // Error
     *     const c: string = a; // OK
     */
    create: <T, U extends string>(value: InferBase<T, U>) => value as T,
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
