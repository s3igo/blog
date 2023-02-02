import type { Plugin } from "../types";
import { frontmatterSchema as schema } from "../types";

// frontmatterの型チェック
export const validateFrontmatter: Plugin = () => {
    return (_, { data: { astro: frontmatter } }) => {
        schema.parse(frontmatter);
    };
};
