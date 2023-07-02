import type { MarkdownHeading } from 'astro';
import type { AstroComponentFactory } from 'astro/dist/runtime/server';
import { type CollectionEntry, getCollection } from 'astro:content';
import { type Companion, Opaque } from '~/utils/types';
import { Body } from '../../body';
import { Tags } from '../../tags';
import { Url } from '../../url';
import { Dates } from './dates';
import { Name } from './name';

type PostSchema = {
    /** 記事の日付情報 */
    dates: Dates;
    /** 記事のタグの配列 */
    tags: Tags;
    /** 記事のファイル名 */
    name: Name;
    /** 記事のURL */
    url: Url;
    /** 記事の本文による情報 */
    body: Body;
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

    return {
        body: Body.new(body),
        Content,
        dates: Dates.new({ published, updated }),
        headings,
        name: Name.new(slug),
        tags: Tags.new(tags),
        url: Url.new({ dates: Dates.new({ published, updated }), name: Name.new(slug) }),
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
