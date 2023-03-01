import { PAGE_TITLE } from '~/constants';

export const pageTitle = (text: string): string => `${text} | ${PAGE_TITLE}`;

// TODO: ほかの関数もここに移す

export const tagUrl = (name: string): string => `/tags/${name}`;
