import { truncate } from "../utils/string";
import type { Plugin, Type, Value } from "./types";
import { toString } from "mdast-util-to-string";
import * as R from "remeda";

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
        // 重要性低いので問題でてきたら対応で十分
        type Args = Type & Value;
        const withoutHeaderAndHtmlComment = R.pipe(
            children,
            R.reject(({ type, value: _ }: Args) => type === "heading"),
            R.reject(({ type, value }: Args) => type === "html" && value.indexOf("<!--") === 0)
        );
        const content = toString(withoutHeaderAndHtmlComment);
        // 先頭500文字で切る
        frontmatter.description = truncate(content, 500);
    };
};
