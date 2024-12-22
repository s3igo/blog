import { getCollection } from 'astro:content';
import type {
    GetStaticPaths,
    InferGetStaticParamsType,
    InferGetStaticPropsType,
} from 'astro';
import { filterPublished } from '~/utils/posts';

export const getStaticPaths = (async () => {
    const posts = filterPublished(await getCollection('posts'));

    return posts.map((post) => ({
        params: { id: post.id },
        props: { post },
    }));
}) satisfies GetStaticPaths;

export type Props = InferGetStaticPropsType<typeof getStaticPaths>;
export type Params = InferGetStaticParamsType<typeof getStaticPaths>;
