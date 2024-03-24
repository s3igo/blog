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

/**
 * @param path absolute path from project root
 */
const composeUrl = (path: string) =>
    new URL(
        // NOTE: workaround for differences between dev and build environments
        import.meta.env.PROD ? `../..${path}` : `../../..${path}`,
        import.meta.url,
    );

export const GET = async ({ params }: APIContext) => {
    const post = await getEntryBySlug('posts', params.slug as Params['slug']);
    const { title, tags } = post.data;

    const markup = html`<div tw="flex bg-slate-900 text-slate-900 h-full py-8">
        <div tw="flex w-[500px] py-12 mx-auto flex-col">
            <img
                src="https://icon.tsuki-yo.net/icon.png"
                width="100"
                height="100"
                tw="rounded-full"
                alt="icon"
            />
            <h1 tw="text-5xl text-slate-200 py-10">${title}</h1>
            <div tw="flex" style="gap: 12px;">
                ${tags.map(
                    (tag) => `<p
                        tw="text-xl text-slate-200 bg-slate-700 rounded-full px-4 pt-1 pb-2"
                        style="font-family: 'JetBrains Mono';"
                    >#${tag}</p>`,
                )}
            </div>
        </div>
    </div>`;

    const svg = await satori(markup, {
        width: 1200,
        height: 630,
        fonts: [
            {
                name: 'Zen Kaku Gothic New',
                data: await fs.readFile(
                    composeUrl(
                        '/node_modules/@fontsource/zen-kaku-gothic-new/files/zen-kaku-gothic-new-japanese-400-normal.woff',
                    ),
                ),
                style: 'normal',
            },
            {
                name: 'JetBrains Mono',
                data: await fs.readFile(
                    composeUrl(
                        '/node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff',
                    ),
                ),
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
