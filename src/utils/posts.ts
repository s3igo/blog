import type { CollectionEntry } from 'astro:content';

export type Posts = CollectionEntry<'posts'>[];

export const filterPublished = (posts: Posts): Posts =>
    posts.filter(({ data }) => import.meta.env.DEV || !data.draft);

export type Tags = string[];

export const sortedUniqueTags = (posts: Posts): Tags => [
    ...new Set(posts.flatMap(({ data }) => data.tags).toSorted()),
];

if (import.meta.vitest) {
    const { describe, expect, test, vi } = import.meta.vitest;

    describe('filterPublished', () => {
        const posts = [
            { data: { draft: true, title: 'Draft' } },
            { data: { draft: false, title: 'Published' } },
        ] as Posts;

        test('filters out drafts', () => {
            vi.stubEnv('DEV', false);
            const filtered = filterPublished(posts);

            if (filtered[0] === undefined) {
                throw new Error('No posts');
            }
            expect(filtered[0].data.title).toBe('Published');
        });
        test('includes drafts in development', () => {
            vi.stubEnv('DEV', true);
            const filtered = filterPublished(posts);

            if (filtered[0] === undefined) {
                throw new Error('No posts');
            }
            expect(filtered[0].data.title).toBe('Draft');
        });
    });

    describe('uniqueTags', () => {
        test('returns unique tags', () => {
            const posts = [
                { data: { tags: ['a', 'b'] } },
                { data: { tags: ['b', 'c'] } },
            ] as Posts;
            expect(sortedUniqueTags(posts)).toEqual(['a', 'b', 'c']);
        });
        test('sorts tags', () => {
            const posts = [
                { data: { tags: ['b', 'a'] } },
                { data: { tags: ['c', 'b'] } },
            ] as Posts;
            expect(sortedUniqueTags(posts)).toEqual(['a', 'b', 'c']);
        });
    });
}
