import { layouts } from '../types';
import type { Plugin } from './types';

// デフォルトのレイアウトを指定
export const injectDefaultLayout: Plugin = () => {
    return (
        _,
        {
            data: {
                astro: { frontmatter },
            },
        }
    ) => {
        frontmatter.layout ??= layouts.Blog;
    };
};
