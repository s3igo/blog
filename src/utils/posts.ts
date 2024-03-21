import type { CollectionEntry } from 'astro:content';

export type Posts = CollectionEntry<'posts'>[];

export const filterPublished = (posts: Posts): Posts =>
    posts.filter(({ data }) => import.meta.env.DEV || !data.draft);

export type Tags = string[];

export const uniqueTags = (posts: Posts): Tags => [
    ...new Set(posts.flatMap(({ data }) => data.tags).toSorted()),
];
