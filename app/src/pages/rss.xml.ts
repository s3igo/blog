import rss from '@astrojs/rss';
import { RSSOptions } from '@astrojs/rss';
import type { APIContext } from 'astro';
import type { MarkdownInstance } from 'astro';
import sanitizeHtml from 'sanitize-html';
import { PAGE_DESCRIPTION, PAGE_TITLE } from '~/constants';
import type { Frontmatter } from '~/types';
import { first3Sentences } from '~/utils/string';

export const get = (context: APIContext) => {
    const site = context.site?.toString() ?? '';
    const postImportResult = import.meta.glob('./posts/**/*.md', { eager: true });
    const posts = Object.values(postImportResult) as MarkdownInstance<Frontmatter>[];

    return rss({
        title: PAGE_TITLE,
        description: PAGE_DESCRIPTION,
        site,
        items: posts.map(({ url, compiledContent, frontmatter }) => ({
            link: url ?? site,
            content: sanitizeHtml(compiledContent()),
            description: first3Sentences(frontmatter.preview),
            ...frontmatter,
        })),
        customData: `<language>ja</language>`,
    });
};

// declare type RSSFeedItem = {
//     /** Link to item */
//     link: string;
//     /** Full content of the item. Should be valid HTML */
//     content?: string;
//     /** Title of item */
//     title: z.infer<typeof rssSchema>['title'];
//     /** Publication date of item */
//     pubDate: z.infer<typeof rssSchema>['pubDate'];
//     /** Item description */
//     description?: z.infer<typeof rssSchema>['description'];
//     /** Append some other XML-valid data to this item */
//     customData?: z.infer<typeof rssSchema>['customData'];
//     /** Whether draft or not */
//     draft?: z.infer<typeof rssSchema>['draft'];
// };
