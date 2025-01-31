import rss from '@astrojs/rss';
import MarkdownIt from 'markdown-it';
import sanitizeHtml from 'sanitize-html';
import { getPublishedPosts } from '../../../shared/api/index.ts';
import { PAGE_DESCRIPTION, PAGE_TITLE } from '../../../shared/config/index.ts';
import type { ApiRoute, PathnameBuilder } from '../../../shared/lib/index.ts';

const parser = new MarkdownIt();

type EndpointOptions = {
    postPathnameBuilder: PathnameBuilder;
};

export const defineEndpoint =
    ({ postPathnameBuilder }: EndpointOptions): ApiRoute =>
    async ({ site }) => {
        const posts = await getPublishedPosts();

        return rss({
            title: PAGE_TITLE,
            site: new URL('/', site).toString(),
            customData: '<language>ja</language>',
            description: PAGE_DESCRIPTION,
            items: posts.map(({ body, data, id }) => {
                if (!body) {
                    throw new Error(`Post ${id} has no body`);
                }
                return {
                    title: data.title,
                    pubDate: data.published,
                    link: postPathnameBuilder(id),
                    content: sanitizeHtml(parser.render(body)),
                };
            }),
        });
    };
