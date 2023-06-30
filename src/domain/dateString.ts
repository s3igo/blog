import { format } from 'date-fns';
import { newType } from '~/utils/types';
import type { Companion } from '~/utils/types';

type DateString = string & { readonly brand: unique symbol };
export const DateString: Companion<Date, DateString> = {
    new: (date) => newType(format(date, 'yyyy-MM-dd')),
};

if (import.meta.vitest) {
    const { describe, expect, test } = import.meta.vitest;

    describe('dateString', () => {
        test('yyyy-MM-dd', () => {
            expect(DateString.new(new Date('2021-01-01'))).toBe('2021-01-01');
        });
        test('yyyy/MM/dd', () => {
            expect(DateString.new(new Date('2021/01/01'))).toBe('2021-01-01');
        });
    });
}
