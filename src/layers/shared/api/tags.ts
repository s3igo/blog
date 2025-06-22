import { getPosts, type Post } from './posts.ts';

const toSortedUniqueTags = (posts: Post[]): string[] => [
    ...new Set(posts.flatMap(({ data }) => data.tags).toSorted()),
];

export const getSortedUniqueTags = async (): Promise<string[]> =>
    getPosts().then(toSortedUniqueTags);

if (import.meta.vitest) {
    const { describe, expect, test } = import.meta.vitest;

    describe('toSortedUniqueTags', () => {
        test('returns unique tags', () => {
            const posts = [
                { data: { tags: ['a', 'b'] } },
                { data: { tags: ['b', 'c'] } },
            ] as Post[];
            expect(toSortedUniqueTags(posts)).toEqual(['a', 'b', 'c']);
        });
        test('sorts tags', () => {
            const posts = [
                { data: { tags: ['b', 'a'] } },
                { data: { tags: ['c', 'b'] } },
            ] as Post[];
            expect(toSortedUniqueTags(posts)).toEqual(['a', 'b', 'c']);
        });
    });
}
