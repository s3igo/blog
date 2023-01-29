// @types/mdastに型あるけど、そこまで厳密性必要ないため使わない
type Func = (tree: any, file: any) => void;
type Plugin = () => Func;

// h1タグの内容をfrontmatter.titleにセットする
export const remarkGetTitle: Plugin = () => {
    return ({ children }, { data }) => {
        // ASTからh1タグを探す
        // remark-normalize-headingsプラグインにより、h1タグは必ず1つ存在することが保証されている
        const title = children.find(
            ({ type, depth }: { type: string; depth: number }) => type === "heading" && depth === 1
        ).children[0].value;
        data.astro.frontmatter.title = title;
    };
};
