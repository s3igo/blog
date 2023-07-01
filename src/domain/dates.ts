import type { Schema as FrontmatterSchema } from '~/content/config';
import { type Companion, newType } from '~/utils/types';
import { DateString } from './dateString';

type Receive = Pick<FrontmatterSchema, 'published' | 'updated'>;

type DatesSchema = {
    /** 記事の公開日（Date型） */
    rawPublished: Date;
    /** 記事の公開日 */
    published: DateString;
    /** 記事の更新日 */
    updated?: DateString | undefined;
};

export type Dates = DatesSchema & { readonly brand: unique symbol };

const transformDates = ({ published, updated }: Receive): DatesSchema => ({
    published: DateString.new(published),
    rawPublished: published,
    updated: updated ? DateString.new(updated) : undefined,
});

export const Dates: Companion<Receive, Dates> = {
    new: (dates) => newType<DatesSchema, Dates>(transformDates(dates)),
};

if (import.meta.vitest) {
    const { describe, expect, test } = import.meta.vitest;

    describe('Dates', () => {
        test('published', () => {
            const dates = Dates.new({ published: new Date('2021-01-01'), updated: null });
            expect(dates.published).toBe('2021-01-01');
            expect(dates.updated).toBe(undefined);
        });
        test('updated', () => {
            const dates = Dates.new({
                published: new Date('2021-01-01'),
                updated: new Date('2021-01-02'),
            });
            expect(dates.published).toBe('2021-01-01');
            expect(dates.updated).toBe('2021-01-02');
        });
        test('rawPublished', () => {
            const dates = Dates.new({ published: new Date('2021-01-01'), updated: null });
            expect(dates.rawPublished).toEqual(new Date('2021-01-01'));
        });
    });
}
