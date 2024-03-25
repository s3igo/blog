export const toStr = (date: Date) => date.toISOString().substring(0, 10);

if (import.meta.vitest) {
    const { describe, expect, test } = import.meta.vitest;

    describe('toStr', () => {
        test('returns the date as a string', () => {
            expect(toStr(new Date('2021-01-01'))).toBe('2021-01-01');
        });
    });
}
