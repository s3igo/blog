import { Separator } from '@kobalte/core';
import { type Component, For, Show } from 'solid-js';
import type { Description, Published, Title, Updated, Url } from '~/domain/values/post';
import type { Tags } from '~/domain/values/tags';
import { Tag } from '../../base/Tag';

type Props = {
    tags: Tags;
    published: Published;
    updated: Updated;
    url: Url;
    title: Title;
    description: Description;
};

const VerticalSeparator: Component = () => (
    <Separator.Root
        orientation="vertical"
        class="h-4 pr-[1.5px] bg-slate-400 mx-[6px] rounded-sm border-none"
    />
);

export const Card: Component<Props> = (props) => (
    <article class="rounded-3xl bg-white hover:border-slate-400 border-2 border-transparent">
        <div class="py-6 px-2 sm:px-8">
            <div class="flex gap-1 items-center flex-wrap">
                <span class="metadata">{props.published}</span>
                <Show when={props.updated !== undefined}>
                    <VerticalSeparator />
                    <span class="metadata">{`edited: ${props.updated}`}</span>
                </Show>
                <Show when={props.tags.length !== 0}>
                    <VerticalSeparator />
                </Show>
                <For each={props.tags}>{(tag) => <Tag name={tag} link={false} />}</For>
            </div>
            <a href={props.url}>
                <h2 class="mb-2.5 pb-1.5 text-xl text-slate-800 sm:text-2xl">{props.title}</h2>
                <p class="line-clamp-5 sm:text-lg">{props.description}</p>
            </a>
        </div>
    </article>
);
