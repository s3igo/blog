import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import MarkdownIt from 'markdown-it';
import sanitizeHtml from 'sanitize-html';
import { PAGE_DESCRIPTION, PAGE_TITLE } from '~/constants';
import { format } from '~/utils/dateToString';
import { first3Sentences } from '~/utils/string';

const parser = new MarkdownIt();

export const get = async (context: APIContext) => {
    const site = context.site?.toString() ?? '';
    const posts = await getCollection('posts');

    return rss({
        customData: '<language>ja</language>',
        description: PAGE_DESCRIPTION,
        items: posts.map(({ body, data, slug }) => {
            const [_, ...textStartWithTitle] = body.split('# ');
            const [title, ...content] = textStartWithTitle.join('').split('\n');

            return {
                content: sanitizeHtml(parser.render(content.join(''))),
                description: first3Sentences(content.join('')),
                link:
                    `/posts/${format(data.published)}/${slug.split('/').slice(-1)[0] ?? ''}` ??
                    site,
                pubDate: data.published,
                title: title ?? '',
            };
        }),
        site,
        title: PAGE_TITLE,
    });
};
