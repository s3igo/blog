import { Opaque } from '~/utils/types';
import type { Companion } from '~/utils/types';
import type { Posts } from './post';

/**
 * 記事のタグ
 * @package
 */
export type Tag = Opaque<string, 'Tag'>;

type From<T, U> = {
    from: (v: T) => U;
};

/** ユニークで整列済みであることを保証されたタグの配列 */
export type Tags = Opaque<Tag[], 'Tags'>;
export const Tags: Companion<string[], Tags> & From<Posts, Tags> = {
    from: (posts) => Tags.new(posts.flatMap(({ tags }) => tags)),
    new: (tags) =>
        Opaque.create<Tags, 'Tags'>(
            [...new Set(tags)].sort().map((tag) => Opaque.create<Tag, 'Tag'>(tag))
        ),
};

if (import.meta.vitest) {
    const { describe, expect, test } = import.meta.vitest;

    describe('Tags', () => {
        test('unique', () => {
            expect(Tags.new(['a', 'b', 'a'])).toEqual(['a', 'b']);
        });
        test('sort', () => {
            expect(Tags.new(['b', 'a', 'c'])).toEqual(['a', 'b', 'c']);
        });
    });
}
