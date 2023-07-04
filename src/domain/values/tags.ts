import { Opaque } from '~/utils/types';
import type { Companion } from '~/utils/types';

/**
 * 記事のタグ
 * @package
 */
export type Tag = Opaque<string, 'Tag'>;

/** ユニークで整列済みであることを保証されたタグの配列 */
export type Tags = Opaque<Tag[], 'Tags'>;
export const Tags: Companion<string[], Tags> = {
    new: (tags) =>
        Opaque.create<Tags, Tag[]>(
            [...new Set(tags)].sort().map((tag) => Opaque.create<Tag, string>(tag))
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
