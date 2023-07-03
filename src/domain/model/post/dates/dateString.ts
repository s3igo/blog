import { format } from 'date-fns';
import { type Companion, Opaque } from '~/utils/types';

/**
 * yyyy-MM-dd形式の文字列型
 * @package
 */
export type DateString = Opaque<string, 'DateString'>;
export const DateString: Companion<Date, DateString> = {
    new: (date) => Opaque.create<DateString, string>(format(date, 'yyyy-MM-dd')),
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
