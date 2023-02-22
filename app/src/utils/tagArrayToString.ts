import type { NonEmptyArray } from './types';

type Func = (tags: NonEmptyArray<string>) => string;

export const toStr: Func = (tags) => tags.map((tag) => `#${tag}`).join(' ');
