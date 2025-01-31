import type { PathnameBuilder } from '../../shared/lib/index.ts';

export const postPathnameBuilder: PathnameBuilder = (id) => `/posts/${id}`;
export const tagPathnameBuilder: PathnameBuilder = (tag) => `/tags/${tag}`;
