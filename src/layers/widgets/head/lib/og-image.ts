// https://vite.dev/guide/assets.html#explicit-inline-handling
import jetbrainsMono from '@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff?url&inline';
import zenKakuGothicNew from '@fontsource/zen-kaku-gothic-new/files/zen-kaku-gothic-new-japanese-400-normal.woff?url&inline';
import satori from 'satori';
import sharp from 'sharp';
import { PAGE_TITLE } from '../../../shared/config/index.ts';

export const width = 1200;
export const height = 630;

// https://github.com/vitejs/vite/issues/12366#issuecomment-2674191945
const dataUrlToArrayBuffer = (dataUrl: string): ArrayBuffer => {
    const base64StartIndex = dataUrl.indexOf('base64,');
    if (base64StartIndex >= 0) {
        const base64 = dataUrl.slice(base64StartIndex + 'base64,'.length);
        const binaryString = atob(base64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
    }
    const str = decodeURIComponent(dataUrl.slice(dataUrl.indexOf(',') + 1));
    const enc = new TextEncoder();
    const bytes = enc.encode(str);

    if (bytes.buffer instanceof ArrayBuffer) {
        return bytes.buffer;
    }
    // bytes.bufferがSharedArrayBufferの場合はArrayBufferに変換して返す
    const arrayBuffer = new ArrayBuffer(bytes.length);
    const sourceArray = new Uint8Array(bytes);
    const targetArray = new Uint8Array(arrayBuffer);
    targetArray.set(sourceArray);
    return arrayBuffer;
};

// このプロジェクトが依存するTailwindCSS v4では色空間にoklchを利用するように変更され、
// oklchはsatoriでサポートされないためTailwindCSS v3の色定義を利用する
// https://github.com/tailwindlabs/tailwindcss/blob/v3/src/public/colors.js
const slate200 = '#e2e8f0';
const slate700 = '#334155';
const slate900 = '#0f172a';

// src/assets/icon-192.pngをBase64エンコードしたもの
// Coreutils: $ base64 -w 0 src/assets/icon-192.png
// macOS built-in: $ base64 -i src/assets/icon-192.png
const icon =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAADABAMAAACg8nE0AAAAMFBMVEVAUmH05J3p2pnc0JS5tIidnn6DiHV2eHttcnVkbHBZZGxSXmhNW2VGVWE8Tlw4S1r3UCVsAAAGM0lEQVR42u3cT4wTVRwH8PEkCNvm0UJcg4eNiQcTY2q4mJiQDcR4MCHEyM2QKhBNJD1ORQ/emCIRSUyWKeISPSgzClz811fBP4kIvNJiIgbc2XIwAZXdacJS2aWdn/3NdJdtd1rebzpropnvYXvZvk9+773fe223WeWksqxZpcRhWVOLgAiIgAiIgAiIgAiIgAj4NwBHURR7mQAHnzdkDcWWCahZNv6wKlUAmJ4OHZgSF7CAkoWOE0MhVGDqvMAChChNAsBVJRYqgONzLGC1KJWwAEuJ2aECDufcBmgWhTdRFUuBUIHfCvwUPnAuwFvpOLKhATcMw8ACOPcmasKycPxpOyTAKRjmcQC4UuBFb6UnqrjS0yiEATzQLsAwDZyoCSFKyOJOCgWotcZ3CzAMEx1eFFjAkKKEBPyp6/k4QKPldK60YocCOMd0/SgAnD3mTVSB8zIWYFUmIRTgj5yuYwG6rnsTZRah5QjLwnHswYFPDmlvAcBXrYnqWOmJirtVBwbuaJoW9x4+AIBz7ZUWQuAwyrQ9KLBCVbGAL7NazsaJaq90UXyLY8UGBz5W1SrAnOo5X+v6YXQ4L3pbNTYgcPmVUszttb1q1p0ob6XPFfg3uNLW0NWBgEub2PqF8+4oLrim7cMCTJNjAVbFQj4o0NzBGNsCd4MTNb/Sn+IvlKyKHRy4PcpaKcOinFHV122AO4ZhlgGcCWFNQmDgUoq1kux86pj6jrvSbgE3hCjhUNOBgPoIwwx3PfeQDTCX0/NYwHlRwq3qBAJmU8zNRr/W1vTDWAAvzvcaHWiMMi8ZH1vVtNMAzjnOT+JwgYCXWDunYUnG1Ow+APjLKHhbVVHowC+snYR/a5/wrlHstSnsNSrQSM0DSb9dqO7BW8gwjGrLsaxKDKjAh2w+D/oef+N4C+WNzwCgISzLpgJ1tpCHet5Cuu4WIEqlSSACTvou8AT4xzmU091eK2KvEYDOAvAk8s/1rKZjr3EhKkAF0vcGnL2qth+3arvXbAowxxZlO/indTtgrxU4d++1OAX4QQa4pr7h9pp3LVQoQDO1GMiAf2purxkGd3uNBNxiMgAYHb1GAdJSAKame702RQIaKWlgpX7M6zUSMMNkgZrW7jUxYdnSAM6QxC7CrGj3mvu+Ux7AGZLo5FbUrPY+btWiKNnyQJ1JA2Oqe6/xorgA8sDNLmBjb+Ca+jYWYHIRJwDpLuDh3sCs2iqgZuBhQQBSXcBwb6C2x317aPI4AbjOurIOeqeMBZjmSSAAM91AEvpmZd4w4gCONPBdN7CmCvc4LPC0U6SBNOvOeD9gRS6Ph0XtgizgjDIm3wjQ1HI6nnarq7JAgy3J432AX7O5PBYg4rJAfSmwtg8wls0dAYBVwpYFZpYCCegZfOOJBfASyAI32dIc6A3cn93vfnQhfxbdxzDSp9HfahmgafKqNHCQYaR7+fabAHDF5LY0gG1AaLU5LABfWMgCzlbmRvZSc7zPXk5LAzDqBwxDnzTzhhmXr8AXSFT7AGfxlYs04N0GlNMCP3spE4ARhiE080963rQJAPNPpmcBmp4/BUSA0gpnWoBNAoglqJp+HMIA1vYE8jgUcZHlm83xPjwadJtikmXfgdR9dkgAe8q3jbOeSzwq/POc3y59F4jA1t5Awmcn/QhEwEkzivD5OiKAF04/4TXoyHtsmAxcZH3z7OL5f77jpTf50vdP8tVqe/idqa7rmv6yxT+Jzdt27Xph04jXfmSgzuSyhrnJkIEaI6VMBbDTCEkCFcBGIGQdHYCLFGB9AOB3CrAlADBLAQ7QATywpZOAIECatsZ04Gd5YGMgoC4PZAIBdoq0BHQADtKWgA7M0LqADjRGJGeoHBCANG2G6MAtOWB7YKCZkpqhamAAvpcBnobgwJwMcGIAANK0JaYDddoxQQecNKEAAkAoITMgAB+xvnkMBgUaKeopQf9jaZ+8CIMD8DLrmUchDKAxSno/SAegnuqxAONAAOjCmgwQALqQ2A0SIXxxoyvJcTtMABo7WEeeqYb+hdYvNrGFbNjtQMgA5vLOzU8y9siGbUcAEz4AtgMY5//zpeIIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiID/HLDc/17oHyy25tha5uD3AAAAAElFTkSuQmCC';

type Props = { title?: string | undefined; tags?: string[] | undefined };

const markup = ({ title, tags }: Props) => ({
    type: 'div',
    props: {
        style: {
            display: 'flex',
            backgroundColor: slate900,
            height: '100%',
            width: '100%',
            paddingTop: '5rem',
            paddingBottom: '5rem',
        },
        children: {
            type: 'div',
            props: {
                style: {
                    display: 'flex',
                    width: '1000px',
                    color: slate200,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    flexDirection: 'column',
                },
                children: [
                    {
                        type: 'img',
                        props: {
                            src: icon,
                            width: '100',
                            height: '100',
                            style: {
                                borderRadius: '9999px',
                            },
                        },
                    },
                    {
                        type: 'h1',
                        props: {
                            style: {
                                fontSize: '50px',
                                paddingTop: '2.5rem',
                                paddingBottom: '2.5rem',
                            },
                            children: title ?? PAGE_TITLE,
                        },
                    },
                    {
                        type: 'div',
                        props: {
                            style: {
                                display: 'flex',
                                gap: '16px',
                            },
                            children: tags?.map((tag) => ({
                                type: 'p',
                                props: {
                                    style: {
                                        fontSize: '1.875rem',
                                        lineHeight: '2.25rem',
                                        backgroundColor: slate700,
                                        borderRadius: '9999px',
                                        paddingLeft: '1.25rem',
                                        paddingRight: '1.25rem',
                                        paddingTop: '0.5rem',
                                        paddingBottom: '0.75rem',
                                        fontFamily: 'JetBrains Mono',
                                    },
                                    children: `#${tag}`,
                                },
                            })),
                        },
                    },
                ],
            },
        },
    },
});

// 参考: https://github.com/fabian-hiller/og-img/blob/acdcac7203c383b625bca3168b0499cbe67b9950/src/ImageResponse.ts
export class OgImageResponse extends Response {
    constructor(props: Props = {}) {
        const readableStream = new ReadableStream({
            async start(controller) {
                const svg = await satori(markup(props), {
                    width,
                    height,
                    fonts: [
                        {
                            name: 'Zen Kaku Gothic New',
                            data: dataUrlToArrayBuffer(zenKakuGothicNew),
                            style: 'normal',
                        },
                        {
                            name: 'JetBrains Mono',
                            data: dataUrlToArrayBuffer(jetbrainsMono),
                            style: 'normal',
                        },
                    ],
                });

                const pngBuffer = await sharp(Buffer.from(svg))
                    .png()
                    .toBuffer();

                controller.enqueue(pngBuffer);
                controller.close();
            },
        });

        super(readableStream, {
            status: 200,
            headers: { 'Content-Type': 'image/png' },
        });
    }
}
