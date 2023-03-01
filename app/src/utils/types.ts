export type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};

if (import.meta.vitest) {
    const { test, expectTypeOf, describe } = import.meta.vitest;
    describe('型の構造を変えずにをIDEでキレイに表示できるようにする', () => {
        test('Object', () => {
            type TestCase = {
                a: string;
                b: number;
            };
            expectTypeOf<Prettify<TestCase>>().toEqualTypeOf<TestCase>();
        });

        test('Array', () => {
            type TestCase = string[];
            expectTypeOf<Prettify<TestCase>>().toEqualTypeOf<TestCase>();
        });

        test('Tuple', () => {
            type TestCase = [string, number];
            expectTypeOf<Prettify<TestCase>>().toEqualTypeOf<TestCase>();
        });

        test('Union', () => {
            type TestCase = string | number;
            expectTypeOf<Prettify<TestCase>>().toEqualTypeOf<TestCase>();
        });

        test('Intersection', () => {
            type TestCase = string & number;
            expectTypeOf<Prettify<TestCase>>().toEqualTypeOf<TestCase>();
        });

        // 関数型では使えない
        test('Function', () => {
            type TestCase = (a: string, b: number) => void;
            expectTypeOf<Prettify<TestCase>>().not.toEqualTypeOf<TestCase>();
        });

        test('Object with Function', () => {
            type TestCase = {
                a: (a: string, b: number) => void;
            };
            expectTypeOf<Prettify<TestCase>>().toEqualTypeOf<TestCase>();
        });

        test('Promise', () => {
            type TestCase = Promise<string>;
            expectTypeOf<Prettify<TestCase>>().toEqualTypeOf<TestCase>();
        });
    });
}
