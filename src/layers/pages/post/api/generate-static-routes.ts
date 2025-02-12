import type { GetStaticPaths, InferGetStaticPropsType } from 'astro';
import { getPublishedPosts } from '../../../shared/api/index.ts';

export const getStaticPaths = (async () => {
    const posts = await getPublishedPosts();

    // post.idは各ポストのファイル名から自動生成される
    // https://docs.astro.build/en/guides/content-collections/#built-in-loaders
    return posts.map((post) => ({
        params: { id: post.id },
        props: { post },
    }));
}) satisfies GetStaticPaths;

export type Props = InferGetStaticPropsType<typeof getStaticPaths>;
