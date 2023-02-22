import type { Plugin } from './types';

// ファイル名から作成日を取得してfrontmatter.pubDateにセットする
export const setPubDate: Plugin = () => {
    return (_, { data, history: [path] }) => {
        const [dateStr] = path.split('/').slice(-2);
        data.astro.frontmatter.pubDate = new Date(dateStr);
    };
};
