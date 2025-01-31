import { PAGE_TITLE } from '../../../shared/config/index.ts';
import type { ApiRoute } from '../../../shared/lib/index.ts';
import icon192 from '../assets/icon-192.png';
import icon512 from '../assets/icon-512.png';

export const GET: ApiRoute = () =>
    new Response(
        JSON.stringify({
            name: PAGE_TITLE,
            icons: [
                { src: icon192.src, type: 'image/png', sizes: '192x192' },
                { src: icon512.src, type: 'image/png', sizes: '512x512' },
            ],
        }),
    );
