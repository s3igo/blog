import { Separator } from '@kobalte/core';
import { type Component, For, Show } from 'solid-js';
import type { DateString, Description, Tags, Title, Url } from '~/domain/model/post';
import { Tag } from '../../molecules/Tag';

type Props = {
    tags: Tags;
    published: DateString;
    updated: DateString | undefined;
    url: Url;
    title: Title;
    description: Description;
};

export const Card: Component<Props> = (props) => (
    <article class="hover:custom-shadow rounded-2xl border-2 border-solid border-transparent hover:border-secondary">
        <div class="py-4 px-2 sm:px-5">
            <div class="flex gap-1 items-center flex-wrap">
                <span class="metadata">
                    {props.published + props.updated && ` last updated on ${props.updated}`}
                </span>
                <Show when={props.tags.length !== 0}>
                    <Separator.Root
                        orientation="vertical"
                        class="h-4 pr-px border-none bg-foreground/60 mx-1"
                    />
                </Show>
                <For each={props.tags}>{(tag) => <Tag name={tag} />}</For>
            </div>
            <a href={props.url}>
                <h2 class="mb-2.5 border-b border-tertiary pb-1.5 text-xl text-primary sm:text-2xl">
                    {props.title}
                </h2>
                <p class="bg-gradient-to-b from-foreground via-foreground/80 to-foreground/20 bg-clip-text text-transparent line-clamp-5 sm:text-lg">
                    {props.description}
                </p>
            </a>
        </div>
    </article>
);
