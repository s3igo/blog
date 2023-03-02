import { format as dateFnsFormat } from 'date-fns';

type Func = (date: Date) => string;

export const format: Func = (date) => dateFnsFormat(new Date(date), 'yyyy-MM-dd');

export const embedCreated: Func = (date) => `created on ${format(date)}`;

export const embedUpdated: Func = (date) => `last updated on ${format(date)}`;

if (import.meta.vitest) {
    const { test, expect, describe } = import.meta.vitest;
    describe('dateToString', () => {
        test('yyyy-MM-dd', () => {
            expect(format(new Date('2021-01-01'))).toBe('2021-01-01');
        });
        test('yyyy/MM/dd', () => {
            expect(format(new Date('2021/01/01'))).toBe('2021-01-01');
        });
    });
}
