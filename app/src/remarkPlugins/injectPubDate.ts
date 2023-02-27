import type { Plugin } from './types';

// ファイル名から作成日を取得してfrontmatter.pubDateにセットする
export const injectPubDate: Plugin = () => {
    return (_, { data, history: [path] }) => {
        const [filename] = path.split('/').slice(-1);
        const [dateStr] = filename.split('_').slice(-2);
        data.astro.frontmatter.pubDate ??= new Date(dateStr);
    };
};
