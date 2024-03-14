import type { MarkdownHeading } from 'astro';
import type { AstroComponentFactory } from 'astro/runtime/server/index.js';
import { type CollectionEntry, getCollection } from 'astro:content';
import {
    Body,
    type Description,
    type FirstThreeSentences,
    type TextContent,
    type Title,
} from './post/body';
import { Dates, type Published, type Updated } from './post/dates';
import { Name } from './post/name';
import { type Tag, Tags } from './tags';
import { type Companion, Opaque } from '~/utils/types';

type Receive = {
    name: Name;
    dates: Dates;
};

export type UrlType = Opaque<string, 'Url'>;
export const Url: Companion<Receive, UrlType> = {
    new: ({ dates, name }) =>
        Opaque.create<UrlType, 'Url'>(`/posts/${dates.published}/${name}`),
};

export type {
    Tag,
    FirstThreeSentences,
    Title,
    Published,
    Updated,
    Description,
};

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
    published: Published;
    /** 記事の更新日 */
    updated: Updated;
    /** 記事のタグの配列 */
    tags: Tags;
    /** 記事のファイル名 */
    name: Name;
    /** 記事のURL */
    url: UrlType;
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
    new: async (value) =>
        Opaque.create<Post, 'Post'>(await transformPost(value)),
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
