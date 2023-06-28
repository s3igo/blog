import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import sanitizeHtml from 'sanitize-html';
import { PAGE_DESCRIPTION, PAGE_TITLE } from '~/constants';
import { postUrl } from '~/utils/constructString';
import { format } from '~/utils/dateToString';
import { globPosts } from '~/utils/process';
import { first3Sentences } from '~/utils/string';

export const get = (context: APIContext) => {
    const site = context.site?.toString() ?? '';
    const posts = globPosts();

    return rss({
        customData: '<language>ja</language>',
        description: PAGE_DESCRIPTION,
        items: posts.map(({ compiledContent, frontmatter }) => ({
            content: sanitizeHtml(compiledContent()),
            description: first3Sentences(frontmatter.preview),
            link: postUrl(format(frontmatter.pubDate), frontmatter.slug) ?? site,
            ...frontmatter,
        })),
        site,
        title: PAGE_TITLE,
    });
};
