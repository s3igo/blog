import { Separator } from '@kobalte/core';
import type { Component } from 'solid-js';
import type { Frontmatter } from '~/types';
import { postUrl } from '~/utils/constructString';
import { embedUpdated, format } from '~/utils/dateToString';
import type { Prettify } from '~/utils/types';
import { Metadata } from '../atoms/Metadata';
import { Tag } from './Tag';

export type Props = Prettify<Omit<Frontmatter, 'draft' | 'layout'>>;

export const Card: Component<Props> = ({ title, slug, tags, preview, pubDate, updatedAt }) => {
    const publishedAt = format(pubDate);
    const date = publishedAt + (updatedAt !== undefined ? embedUpdated(pubDate) : '');

    return (
        <article class="hover:custom-shadow rounded-2xl border-2 border-solid border-transparent hover:border-secondary">
            <div class="py-4 px-2 sm:px-5">
                <div class="flex gap-1 items-center">
                    <Metadata text={date} />
                    <Separator.Root
                        orientation="vertical"
                        class="h-4 w-px border-none bg-foreground/60 mx-1"
                    />
                    {tags.map((tag) => (
                        <Tag name={tag} />
                    ))}
                </div>
                <a href={postUrl(publishedAt, slug)}>
                    <h2 class="mb-2.5 border-b border-tertiary pb-1.5 text-xl text-primary sm:text-2xl">
                        {title}
                    </h2>
                    <p class="bg-gradient-to-b from-foreground via-foreground/80 to-foreground/20 bg-clip-text text-transparent line-clamp-5 sm:text-lg">
                        {preview}
                    </p>
                </a>
            </div>
        </article>
    );
};
