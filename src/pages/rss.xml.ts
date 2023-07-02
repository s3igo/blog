import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import MarkdownIt from 'markdown-it';
import sanitizeHtml from 'sanitize-html';
import { PAGE_DESCRIPTION, PAGE_TITLE } from '~/constants';
import { Posts } from '~/domain/model/post';

const parser = new MarkdownIt();

export const get = async (context: APIContext) => {
    const site = context.site?.toString() ?? '';
    const posts = await Posts.fetch();

    return rss({
        customData: '<language>ja</language>',
        description: PAGE_DESCRIPTION,
        items: posts.map(({ body, dates, url }) => ({
            content: sanitizeHtml(parser.render(body.text)),
            description: body.firstThreeSentences,
            link: url,
            pubDate: dates.rawPublished,
            title: body.title,
        })),
        site,
        title: PAGE_TITLE,
    });
};
