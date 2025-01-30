import jetbrainsMono from '@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff?arraybuffer';
import zenKakuGothicNew from '@fontsource/zen-kaku-gothic-new/files/zen-kaku-gothic-new-japanese-400-normal.woff?arraybuffer';
import satori from 'satori';
import { html } from 'satori-html';
import sharp from 'sharp';
import type { Tags } from '~/utils/posts';

export const width = 1200;
export const height = 600;

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

    const svg = await satori(markup, {
        width,
        height,
        fonts: [
            {
                name: 'Zen Kaku Gothic New',
                data: zenKakuGothicNew,
                style: 'normal',
            },
            {
                name: 'JetBrains Mono',
                data: jetbrainsMono,
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
