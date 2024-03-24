import fs from 'node:fs/promises';
import { getCollection, getEntryBySlug } from 'astro:content';
import type {
    APIContext,
    GetStaticPaths,
    InferGetStaticParamsType,
} from 'astro';
import satori from 'satori';
import { html } from 'satori-html';
import sharp from 'sharp';

export const getStaticPaths = (async () => {
    const posts = await getCollection('posts');

    return posts.map((post) => ({
        params: { slug: post.slug },
    }));
}) satisfies GetStaticPaths;

type Params = InferGetStaticParamsType<typeof getStaticPaths>;

const getFont = async () => {
    const url = new URL(
        import.meta.env.PROD
            ? '../../node_modules/@fontsource/zen-kaku-gothic-new/files/zen-kaku-gothic-new-japanese-400-normal.woff'
            : '../../../node_modules/@fontsource/zen-kaku-gothic-new/files/zen-kaku-gothic-new-japanese-400-normal.woff',
        import.meta.url,
    );
    return await fs.readFile(url);
};

export const GET = async ({ params }: APIContext) => {
    const post = await getEntryBySlug('posts', params.slug as Params['slug']);

    const markup = html`<div tw="flex">
        <h1>${post.data.title}</h1>
    </div>`;

    const svg = await satori(markup, {
        width: 1200,
        height: 630,
        fonts: [
            {
                name: 'Zen Kaku Gothic New',
                data: await getFont(),
                style: 'normal',
            },
        ],
    });

    const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();

    return new Response(pngBuffer, {
        status: 200,
        headers: { 'Content-Type': 'image/png' },
    });
};
