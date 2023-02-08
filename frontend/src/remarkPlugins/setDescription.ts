import { toString } from "mdast-util-to-string";
import { truncate } from "../utils/string";
import type { Plugin, Type, Value } from "./types";

export const setDescription: Plugin = () => {
    return (
        { children },
        {
            data: {
                astro: { frontmatter },
            },
        }
    ) => {
        // TODO: 特にコメントは再帰的にフィルター掛ける必要があるかも
        const withoutHeaderAndHtmlComment = children
            .filter(({ type }: Type) => type !== "heading")
            .filter(
                ({ type, value }: Type & Value) => !(type === "html" && value.indexOf("<!--") === 0)
            );
        const content = toString(withoutHeaderAndHtmlComment);
        frontmatter.description = truncate(content, 500);
    };
};
