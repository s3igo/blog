import { Separator } from '@kobalte/core';
import { Accessor, Component, createSignal, For, Setter, Show, splitProps } from 'solid-js';
import type { Frontmatter } from '~/types';
import { postUrl } from '~/utils/constructString';
import { embedUpdated, format } from '~/utils/dateToString';
import { Metadata } from '../atoms/Metadata';
import { Tag } from '../molecules/Tag';

export type Props = Omit<Frontmatter, 'draft' | 'layout'>;
type PrivateProps = {
    date: string;
    url: string;
    tagHovered: Accessor<boolean>;
    setTagHovered: Setter<boolean>;
} & Omit<Props, 'pubDate' | 'updatedAt' | 'slug'>;

const PrivateCard: Component<PrivateProps> = (props) => (
    <article
        data-tagHovered={props.tagHovered()}
        class="hover:custom-shadow rounded-2xl border-2 border-solid border-transparent hover:border-secondary data-[tagHovered=true]:border-transparent data-[tagHovered=true]:shadow-none"
    >
        <div class="py-4 px-2 sm:px-5">
            <div class="flex gap-1 items-center flex-wrap">
                <Metadata text={props.date} />
                <Show when={props.tags.length !== 0}>
                    <Separator.Root
                        orientation="vertical"
                        class="h-4 pr-px border-none bg-foreground/60 mx-1"
                    />
                </Show>
                <For each={props.tags}>
                    {(tag) => (
                        <div
                            onMouseEnter={() => props.setTagHovered(true)}
                            onMouseLeave={() => props.setTagHovered(false)}
                        >
                            <Tag name={tag} />
                        </div>
                    )}
                </For>
            </div>
            <a href={props.url}>
                <h2 class="mb-2.5 border-b border-tertiary pb-1.5 text-xl text-primary sm:text-2xl">
                    {props.title}
                </h2>
                <p class="bg-gradient-to-b from-foreground via-foreground/80 to-foreground/20 bg-clip-text text-transparent line-clamp-5 sm:text-lg">
                    {props.preview}
                </p>
            </a>
        </div>
    </article>
);

export const Card: Component<Props> = (props) => {
    const [local, others] = splitProps(props, ['pubDate', 'slug', 'updatedAt']);
    const publishedAt = format(local.pubDate);
    const date =
        publishedAt + (local.updatedAt !== null ? ' ' + embedUpdated(local.updatedAt) : '');
    const url = postUrl(publishedAt, local.slug);
    const [tagHovered, setTagHovered] = createSignal(false);
    const privateProps = { ...others, date, url };
    return <PrivateCard {...privateProps} tagHovered={tagHovered} setTagHovered={setTagHovered} />;
};
