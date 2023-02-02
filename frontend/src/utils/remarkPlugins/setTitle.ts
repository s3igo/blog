import type { Plugin } from "../types";

// h1タグの内容をfrontmatter.titleにセットする
export const setTitle: Plugin = () => {
    return ({ children }, { data: { astro: frontmatter } }) => {
        // ASTからh1タグを探す
        // remark-normalize-headingsプラグインにより、h1タグは必ず1つ存在することが保証されている
        const title = children.find(
            ({ type, depth }: { type: string; depth: number }) => type === "heading" && depth === 1
        ).children[0].value;
        frontmatter.title = title;
    };
};
