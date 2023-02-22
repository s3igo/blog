import type { Plugin } from './types';

export const setCreatedDate: Plugin = () => {
    return (_, { data, history: [path] }) => {
        const [date] = path.split('/').slice(-2);
        data.astro.frontmatter.createdAt = new Date(date);
    };
};
