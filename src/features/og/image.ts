import fs from 'node:fs/promises';
import satori, { type FontStyle } from 'satori';
import { html } from 'satori-html';
import sharp from 'sharp';
import type { Tags } from '~/utils/posts';

export const width = 1200;
export const height = 600;

/**
 * @param path absolute path from project root
 */
const composeUrl = (path: string) =>
    new URL(
        // NOTE: workaround for differences between `astro dev` and `astro build` environments
        import.meta.env.PROD ? `../..${path}` : `../../..${path}`,
        import.meta.url,
    );

type Props = { title: string; tags: Tags };

export const image = async ({ title, tags }: Props) => {
    const markup = html`<div tw="flex bg-slate-900 text-slate-900 h-full py-8">
        <div tw="flex w-[1000px] py-12 mx-auto flex-col">
            <img
                src="https://icon.tsuki-yo.net/icon.png"
                width="100"
                height="100"
                tw="rounded-full"
            />
            <h1 tw="text-[50px] text-slate-200 py-10">${title}</h1>
            <div tw="flex" style="gap: 16px;">
                ${tags.map(
                    (tag) => `<p
                        tw="text-3xl text-slate-200 bg-slate-700 rounded-full px-5 pt-2 pb-3"
                        style="font-family: 'JetBrains Mono';"
                    >#${tag}</p>`,
                )}
            </div>
        </div>
    </div>`;

    const fonts = await Promise.all(
        [
            {
                name: 'Zen Kaku Gothic New',
                file: '/node_modules/@fontsource/zen-kaku-gothic-new/files/zen-kaku-gothic-new-japanese-400-normal.woff',
            },
            {
                name: 'JetBrains Mono',
                file: '/node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff',
            },
        ].map(async ({ name, file }) => ({
            name,
            data: await fs.readFile(composeUrl(file)),
            style: 'normal' as FontStyle,
        })),
    );

    const svg = await satori(markup, { width, height, fonts });
    const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();

    return new Response(pngBuffer, {
        status: 200,
        headers: { 'Content-Type': 'image/png' },
    });
};
