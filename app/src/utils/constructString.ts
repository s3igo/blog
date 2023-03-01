import { PAGE_TITLE } from '~/constants';

export const pageTitle = (text: string): string => `${text} | ${PAGE_TITLE}`;

export const postUrl = (date: string, slug: string): string => `/posts/${date}/${slug}`;
