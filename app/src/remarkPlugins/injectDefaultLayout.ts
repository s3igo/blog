import { layouts } from '../types';
import type { Plugin } from './types';

// デフォルトのレイアウトを指定
export const injectDefaultLayout: Plugin = () => {
    return (_, { data }) => {
        data.astro.frontmatter.layout ??= layouts.blog;
    };
};
