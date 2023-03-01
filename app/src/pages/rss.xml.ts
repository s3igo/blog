import rss from '@astrojs/rss';
import type { APIContext, MarkdownInstance } from 'astro';
import sanitizeHtml from 'sanitize-html';
import { PAGE_DESCRIPTION, PAGE_TITLE } from '~/constants';
import type { Frontmatter } from '~/types';
import { postUrl } from '~/utils/constructString';
import { format } from '~/utils/dateToString';
import { first3Sentences } from '~/utils/string';

export const get = (context: APIContext) => {
    const site = context.site?.toString() ?? '';
    const postImportResult = import.meta.glob('../data/posts/*.md', { eager: true });
    const posts = Object.values(postImportResult) as MarkdownInstance<Frontmatter>[];

    return rss({
        title: PAGE_TITLE,
        description: PAGE_DESCRIPTION,
        site,
        items: posts.map(({ compiledContent, frontmatter }) => ({
            link: postUrl(format(frontmatter.pubDate), frontmatter.slug) ?? site,
            content: sanitizeHtml(compiledContent()),
            description: first3Sentences(frontmatter.preview),
            ...frontmatter,
        })),
        customData: '<language>ja</language>',
    });
};
