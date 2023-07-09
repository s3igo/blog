import type { Schema as FrontmatterSchema } from '~/content/config';
import { type Companion, Opaque } from '~/utils/types';
import { DateString } from './dates/dateString';

type Receive = Pick<FrontmatterSchema, 'published' | 'updated'>;

/** @package */
export type Published = Opaque<DateString, 'Published'>;
/** @package */
export type Updated = DateString | undefined;

type DatesSchema = {
    published: Published;
    updated: Updated;
};

/** @package */
export type Dates = Opaque<DatesSchema, 'Dates'>;
export const Dates: Companion<Receive, Dates> = {
    new: ({ published, updated }) =>
        Opaque.create<Dates, 'Dates'>({
            published: Opaque.create<Published, 'Published'>(DateString.new(published)),
            updated: updated ? DateString.new(updated) : undefined,
        }),
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
    });
}
