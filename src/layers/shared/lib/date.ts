/**
 * Dateオブジェクトをyyyy-MM-dd形式の文字列に変換する
 */
export const dateToStr = (date: Date) => date.toISOString().substring(0, 10);

if (import.meta.vitest) {
    const { describe, expect, test } = import.meta.vitest;

    describe('dateToStr', () => {
        test('Dateオブジェクトをyyyy-MM-dd形式の文字列に変換する', () => {
            expect(dateToStr(new Date('2021-01-01'))).toBe('2021-01-01');
        });
    });
}
