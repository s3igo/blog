import type { Depth, Plugin, Type } from './types';

// h1タグの内容をfrontmatter.titleにセットする
export const setTitle: Plugin = () => {
    return ({ children }, { data }) => {
        // ASTからh1タグを探す
        // remark-normalize-headingsプラグインにより、h1タグは必ず1つ存在することが保証されている
        const [title] = children.find(
            ({ type, depth }: Type & Depth) => type === 'heading' && depth === 1
        ).children;
        data.astro.frontmatter.title = title.value;
    };
};
