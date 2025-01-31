import type {
    GetStaticPaths,
    InferGetStaticParamsType,
    InferGetStaticPropsType,
} from 'astro';
import {
    getPublishedPosts,
    getSortedUniqueTags,
} from '../../../shared/api/index.ts';

export const getStaticPaths = (async () => {
    const posts = await getPublishedPosts();
    const tags = await getSortedUniqueTags();

    return tags.map((tag) => ({
        params: { tag },
        props: {
            taggedPosts: posts.filter(({ data }) => data.tags.includes(tag)),
        },
    }));
}) satisfies GetStaticPaths;

export type Props = InferGetStaticPropsType<typeof getStaticPaths>;
export type Params = InferGetStaticParamsType<typeof getStaticPaths>;
