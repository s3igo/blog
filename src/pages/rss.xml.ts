import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import MarkdownIt from 'markdown-it';
import sanitizeHtml from 'sanitize-html';
import { filterPublished } from '~/utils/posts';
import { PAGE_DESCRIPTION, PAGE_TITLE } from '../constants.ts';

const parser = new MarkdownIt();

export const GET: APIRoute = async ({ site }) => {
    const posts = filterPublished(await getCollection('posts'));

    return rss({
        title: PAGE_TITLE,
        site: site?.toString() ?? '',
        customData: '<language>ja</language>',
        description: PAGE_DESCRIPTION,
        items: posts.map(({ body, data, id }) => {
            if (!body) {
                throw new Error(`Post ${id} has no body`);
            }

            return {
                title: data.title,
                link: `/posts/${id}`,
                pubDate: data.published,
                content: sanitizeHtml(parser.render(body)),
            };
        }),
    });
};
