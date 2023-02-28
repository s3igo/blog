type Func = (tags: string[]) => string;

export const toStr: Func = (tags) => tags.map((tag) => `#${tag}`).join(' ');

if (import.meta.vitest) {
    const { test, expect, describe } = import.meta.vitest;
    describe('文字列の配列を渡すと、それらを#で始まる文字列に変換して返す', () => {
        test('空の配列', () => {
            const testCase: string[] = [];
            expect(toStr(testCase)).toBe('');
        });

        test('1つのタグ', () => {
            const testCase = ['tag1'];
            expect(toStr(testCase)).toBe('#tag1');
        });

        test('3つのタグ', () => {
            const testCase = ['tag1', 'tag2', 'tag3'];
            expect(toStr(testCase)).toBe('#tag1 #tag2 #tag3');
        });
    });
}
