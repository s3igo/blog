import { frontmatterSchema as schema } from '../types';
import type { Plugin } from './types';

// frontmatterの型チェック
export const validateFrontmatter: Plugin = () => {
    return (_, { data }) => {
        schema.parse(data.astro.frontmatter);
    };
};
