// h1タグの内容をfrontmatter.titleにセットする
export function remarkGetTitle() {
    return function (tree, { data }) {
        const { children } = tree;
        // ASTからh1タグを探す
        // remark-normalize-headingsプラグインにより、h1タグは必ず1つ存在することが保証されている
        const title = children.find(({ type, depth }) => type === "heading" && depth === 1)
            .children[0].value;
        data.astro.frontmatter.title = title;
    };
}
