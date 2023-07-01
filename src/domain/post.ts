import type { MarkdownHeading } from 'astro';
import type { AstroComponentFactory } from 'astro/dist/runtime/server';
import { type CollectionEntry, getCollection } from 'astro:content';
import { type Companion, newType } from '~/utils/types';
import { Body } from './body';
import { Dates } from './dates';
import { Name } from './name';
import { Tags } from './tags';
import { Url } from './Url_tmp';

type Meta = {
    dates: Dates;
    tags: Tags;
    name: Name;
    url: Url;
};

type PostSchema = {
    meta: Meta;
    body: Body;
    Content: AstroComponentFactory;
    headings: MarkdownHeading[];
};

export type Post = PostSchema & { readonly brand: unique symbol };

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
        headings,
        meta: {
            dates: Dates.new({ published, updated }),
            name: Name.new(slug),
            tags: Tags.new(tags),
            url: Url.new({ dates: Dates.new({ published, updated }), name: Name.new(slug) }),
        },
    };
};

export const Post: Companion<CollectionEntry<'posts'>, Promise<Post>> = {
    new: async (value) => newType<PostSchema, Post>(await transformPost(value)),
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
