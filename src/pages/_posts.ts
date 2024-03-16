import { type CollectionEntry, getCollection } from 'astro:content';

type PostsData = {
    posts: CollectionEntry<'posts'>[];
    tags: string[];
};

export const getPosts = async (): Promise<PostsData> => {
    const posts = await getCollection('posts');
    return {
        posts,
        tags: [...new Set(posts.flatMap(({ data }) => data.tags).toSorted())],
    };
};
