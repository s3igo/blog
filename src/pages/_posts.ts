import { type CollectionEntry, getCollection } from 'astro:content';

export type Cards = Array<{
    title: string;
    href: string;
    published: string;
    updated: string | undefined;
    tags: string[];
}>;

type PostsData = {
    posts: CollectionEntry<'posts'>[];
    tags: string[];
    cards: Cards;
};

export const getPosts = async (): Promise<PostsData> => {
    const posts = await getCollection('posts');
    return {
        posts,
        tags: [...new Set(posts.flatMap(({ data }) => data.tags).toSorted())],
        cards: posts
            .map(({ data, slug }) => ({
                title: data.title,
                href: `/posts/${slug}`,
                published: data.published.toISOString().substring(0, 10),
                updated: data.updated?.toISOString().substring(0, 10),
                tags: data.tags,
            }))
            .toSorted((a, b) => a.published.localeCompare(b.published))
            .toReversed()
    };
};
