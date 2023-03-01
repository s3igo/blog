import * as R from 'remeda';
import type { Props as ListProps } from '~/components/molecules/List';
import type { Frontmatter } from '~/types';

type Func = (posts: Frontmatter[]) => ListProps[keyof ListProps];
export const postsToArticles: Func = (posts) => {
    return R.pipe(
        posts,
        R.sortBy(({ pubDate }) => Number(pubDate)),
        R.reverse()
    );
};
