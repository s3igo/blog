import type { MarkdownHeading } from 'astro';
import type { AstroComponentFactory } from 'astro/dist/runtime/server';
import { type CollectionEntry, getCollection } from 'astro:content';
import { type Companion, Opaque } from '~/utils/types';
import {
    Body,
    type Description,
    type FirstThreeSentences,
    type TextContent,
    type Title,
} from './body';
import { Dates } from './dates';
import type { DateString } from './dates';
import { Name } from './name';
import { Tags } from './tags';
import { Url } from './url';

export { Tags };
export { FirstThreeSentences, Title, DateString };

type PostSchema = {
    /** 記事のタイトル */
    title: Title;
    /** 記事の本文 */
    textContent: TextContent;
    /** 記事の概要（graphemeベースで500文字） */
    description: Description;
    /** 記事の最初の3文 */
    firstThreeSentences: FirstThreeSentences;
    /** 記事の公開日（Date型） */
    rawPublished: Date;
    /** 記事の公開日 */
    published: DateString;
    /** 記事の更新日 */
    updated: DateString | undefined;
    /** 記事のタグの配列 */
    tags: Tags;
    /** 記事のファイル名 */
    name: Name;
    /** 記事のURL */
    url: Url;
    /** レンダリングされた記事のコンポーネント */
    Content: AstroComponentFactory;
    /** 記事の見出し */
    headings: MarkdownHeading[];
};

export type Post = Opaque<PostSchema, 'Post'>;

const transformPost = async ({
    body,
    data,
    render,
    slug,
}: CollectionEntry<'posts'>): Promise<PostSchema> => {
    const { published, tags, updated } = data;
    const { Content, headings } = await render();
    const dates = Dates.new({ published, updated });
    const bodyValues = Body.new(body);

    return {
        Content,
        description: bodyValues.description,
        firstThreeSentences: bodyValues.firstThreeSentences,
        headings,
        name: Name.new(slug),
        published: dates.published,
        rawPublished: published,
        tags: Tags.new(tags),
        textContent: bodyValues.textContent,
        title: bodyValues.title,
        updated: dates.updated,
        url: Url.new({ dates, name: Name.new(slug) }),
    };
};

export const Post: Companion<CollectionEntry<'posts'>, Promise<Post>> = {
    new: async (value) => Opaque.create<Post, PostSchema>(await transformPost(value)),
};

export type Posts = Post[];

export const Posts = {
    fetch: async () => {
        const posts = await getCollection('posts');
        return Promise.all(posts.map((post) => Post.new(post)));
    },
};

// TODO: テスト書く
// モックが必要
