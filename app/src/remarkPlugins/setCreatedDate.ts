import type { Plugin } from './types';

// ファイル名から作成日を取得してfrontmatter.createdAtにセットする
export const setCreatedDate: Plugin = () => {
    return (_, { data, history: [path] }) => {
        const [dateStr] = path.split('/').slice(-2);
        data.astro.frontmatter.createdAt = new Date(dateStr);
    };
};
