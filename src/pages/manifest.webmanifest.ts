import type { APIRoute } from 'astro';
import icon192 from '~/assets/icon-192.png';
import icon512 from '~/assets/icon-512.png';

export const GET: APIRoute = () =>
    new Response(
        JSON.stringify({
            name: 'tsukiyo-room',
            icons: [
                { src: icon192.src, type: 'image/png', sizes: '192x192' },
                { src: icon512.src, type: 'image/png', sizes: '512x512' },
            ],
        }),
    );
