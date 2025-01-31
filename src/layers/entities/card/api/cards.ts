import type { Post } from '../../../shared/api/index.ts';
import type { Card } from '../model/types.ts';
import { adaptPost } from './mapper.ts';

export const postsToCards = (
    posts: Post[],
    options: Parameters<typeof adaptPost>[0],
): Card[] =>
    posts
        .map(adaptPost(options))
        .toSorted((a, b) => b.published.localeCompare(a.published)); // publishedを降順でソート
