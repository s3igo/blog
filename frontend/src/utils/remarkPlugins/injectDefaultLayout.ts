import type { Plugin } from "../types";
import { layouts } from "../types";

// デフォルトのレイアウトを指定
export const injectDefaultLayout: Plugin = () => {
    return (_, { data: { astro: frontmatter } }) => {
        frontmatter.layout ??= layouts.Blog;
    };
};
