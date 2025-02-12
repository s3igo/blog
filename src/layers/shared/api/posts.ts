import { type CollectionEntry, getCollection } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

const filterPublished = (posts: Post[]): Post[] =>
    posts.filter(({ data }) => import.meta.env.DEV || !data.draft);

// productionビルドではgetCollectionの結果がキャッシュされるため、
// ビルド時間に与える影響は軽微なので割と雑に呼んでいい
export const getPosts = async (): Promise<Post[]> => getCollection('posts');

export const getPublishedPosts = async (): Promise<Post[]> =>
    getPosts().then(filterPublished);

if (import.meta.vitest) {
    const { describe, expect, test, vi } = import.meta.vitest;

    describe('filterPublished', () => {
        const posts = [
            { data: { draft: true, title: 'Draft' } },
            { data: { draft: false, title: 'Published' } },
        ] as Post[];

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
}
