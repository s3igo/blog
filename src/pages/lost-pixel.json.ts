import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import {
    type PageScreenshotParameter,
    PageScreenshotParameterSchema as Schema,
} from 'lost-pixel';
import { filterPublished, sortedUniqueTags } from '~/utils/posts';

const index = Schema.parse({
    path: '/',
    name: 'index',
});

const data = filterPublished(await getCollection('posts'));

const tags = sortedUniqueTags(data).map((tag) =>
    Schema.parse({
        path: `/tags/${tag}`,
        name: `tags-${tag}`,
    }),
);

const posts = data.map(({ id }) =>
    Schema.parse({
        path: `/posts/${id}`,
        name: `posts-${id}`,
    }),
);

export const GET: APIRoute = () =>
    new Response(
        JSON.stringify([
            index,
            ...tags,
            ...posts,
        ] satisfies PageScreenshotParameter[]),
    );
