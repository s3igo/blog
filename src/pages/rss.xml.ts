import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import MarkdownIt from 'markdown-it';
import sanitizeHtml from 'sanitize-html';
import { PAGE_DESCRIPTION, PAGE_TITLE } from '~/utils/constants';

const parser = new MarkdownIt();

export const GET = async (context: APIContext) => {
    const site = context.site?.toString() ?? '';
    const posts = await getCollection('posts');

    return rss({
        customData: '<language>ja</language>',
        description: PAGE_DESCRIPTION,
        items: posts.map(({ body, data, slug }) => ({
            content: sanitizeHtml(parser.render(body)),
            link: `/posts/${slug}`,
            pubDate: data.published,
            title: data.title,
        })),
        site,
        title: PAGE_TITLE,
    });
};
