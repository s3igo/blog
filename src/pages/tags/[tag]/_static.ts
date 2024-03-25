import { getCollection } from 'astro:content';
import type {
    GetStaticPaths,
    InferGetStaticParamsType,
    InferGetStaticPropsType,
} from 'astro';
import { filterPublished, sortedUniqueTags } from '~/utils/posts';

export const getStaticPaths = (async () => {
    const posts = filterPublished(await getCollection('posts'));

    return sortedUniqueTags(posts).map((tag) => ({
        params: { tag },
        props: {
            posts,
            taggedPosts: posts.filter(({ data }) => data.tags.includes(tag)),
        },
    }));
}) satisfies GetStaticPaths;

export type Params = InferGetStaticParamsType<typeof getStaticPaths>;
export type Props = InferGetStaticPropsType<typeof getStaticPaths>;
