import type { CustomProjectConfig } from 'lost-pixel';

export const config: CustomProjectConfig = {
    pageShots: {
        pages: [{ path: '/', name: 'index' }],
        baseUrl: 'http://172.17.0.1:4321',
    },
    lostPixelProjectId: 'clxiy1du32ug0n6c9vsgtxahk',
    apiKey: process.env.LOST_PIXEL_API_KEY,
};
