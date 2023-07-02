import { type Companion, Opaque } from '~/utils/types';
import { Dates } from './dates';
import { Name } from './name';

type Receive = {
    name: Name;
    dates: Dates;
};

/** 記事URLの型 */
export type Url = Opaque<string, 'Url'>;
export const Url: Companion<Receive, Url> = {
    new: ({ dates, name }) => Opaque.create<Url, string>(`/posts/${dates.published}/${name}`),
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
