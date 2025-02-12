import {
    type PageScreenshotParameter,
    PageScreenshotParameterSchema as Schema,
} from 'lost-pixel';
import {
    getPublishedPosts,
    getSortedUniqueTags,
} from '../../../shared/api/index.ts';
import type { ApiRoute, PathnameBuilder } from '../../../shared/lib/index.ts';

const index = Schema.parse({
    path: '/',
    name: 'index',
});

const postsData = await getPublishedPosts();
const tagsData = await getSortedUniqueTags();

type EndPointOptions = {
    postPathnameBuilder: PathnameBuilder;
    tagPathnameBuilder: PathnameBuilder;
};

export const defineEndpoint =
    ({ postPathnameBuilder, tagPathnameBuilder }: EndPointOptions): ApiRoute =>
    async () => {
        const posts = postsData.map(({ id }) =>
            Schema.parse({
                path: postPathnameBuilder(id),
                name: `posts-${id}`,
            }),
        );

        const tags = tagsData.map((tag) =>
            Schema.parse({
                path: tagPathnameBuilder(tag),
                name: `tags-${tag}`,
            }),
        );

        return new Response(
            JSON.stringify([
                index,
                ...posts,
                ...tags,
            ] satisfies PageScreenshotParameter[]),
        );
    };
