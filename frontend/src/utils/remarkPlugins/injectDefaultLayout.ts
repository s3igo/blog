import type { Plugin } from "../types";
import { layouts } from "../types";

// デフォルトのレイアウトを指定
export const injectDefaultLayout: Plugin = () => {
    return (_, { data }) => {
        let target = data.astro.frontmatter.layout;
        if (target === undefined) {
            target = layouts.Blog;
        }
    };
};
