import type { CustomProjectConfig } from 'lost-pixel';

export const config: CustomProjectConfig = {
    pageShots: {
        pagesJsonUrl: 'http://localhost:4321/lost-pixel.json',
        pages: [
            {
                path: '/',
                name: 'index',
            },
            {
                path: '/',
                name: 'index-masked',
            },
            {
                path: '/tags/astro',
                name: 'astro',
            },
            {
                path: '/tags/programming',
                name: 'programming',
            },
            {
                path: '/tags/typescript',
                name: 'typescript',
            },
        ],
        mask: [{ selector: 'svg' }],
        breakpoints: [375, 768, 1024],
        baseUrl: 'http://localhost:4321',
    },
    lostPixelProjectId: 'clxiy1du32ug0n6c9vsgtxahk',
    apiKey: process.env.LOST_PIXEL_API_KEY,
};
