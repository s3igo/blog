import { type Companion, newType } from '~/utils/types';
import { Dates } from './dates';
import { Name } from './name';

type Receive = {
    name: Name;
    dates: Dates;
};

export type Url = string & { readonly brand: unique symbol };
export const Url: Companion<Receive, Url> = {
    new: ({ dates, name }) => newType<string, Url>(`/posts/${dates.published}/${name}`),
};

if (import.meta.vitest) {
    const { describe, expect, test } = import.meta.vitest;

    describe('Url', () => {
        test('url', () => {
            const url = Url.new({
                dates: Dates.new({ published: new Date('2021/01/10'), updated: null }),
                name: Name.new('posts/name'),
            });
            expect(url).toBe('/posts/2021-01-10/name');
        });
    });
}
