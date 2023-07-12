import { Separator } from '@kobalte/core';
import { type Component, For, Show } from 'solid-js';
import type { Description, Published, Title, Updated, Url } from '~/domain/values/post';
import type { Tags } from '~/domain/values/tags';

type Props = {
    tags: Tags;
    published: Published;
    updated: Updated;
    url: Url;
    title: Title;
    description: Description;
};

/** @package */
export const Card: Component<Props> = (props) => (
    <a href={props.url}>
        <article class="rounded-3xl bg-white hover:border-cyan-500 border-2 border-transparent py-4 sm:py-6 px-5 sm:px-8">
            <div class="flex sm:items-center max-sm:flex-col">
                <div class="flex items-center">
                    <span class="metadata">{props.published}</span>
                    <Show when={props.updated !== undefined}>
                        <Separator.Root
                            orientation="vertical"
                            class="h-4 md:pr-[1.5px] bg-slate-400 mx-[6px] rounded-sm border-none pr-px"
                        />
                        <span class="metadata">{`↻ ${props.updated}`}</span>
                    </Show>
                </div>
                <Show when={props.tags.length !== 0}>
                    <Separator.Root
                        orientation="vertical"
                        class="h-4 pr-px md:pr-[1.5px] bg-slate-400 mx-[6px] rounded-sm border-none max-sm:hidden"
                    />
                    <div class="flex gap-[6px]">
                        <For each={props.tags}>{(tag) => <span class="metadata">#{tag}</span>}</For>
                    </div>
                </Show>
            </div>
            <h2 class="py-1.5 text-xl text-accent xl:text-2xl before:content-['#_'] before:text-cyan-500">
                {props.title}
            </h2>
            <p class="line-clamp-5 xl:text-lg">{props.description}</p>
        </article>
    </a>
);

// TODO: aの方にスタイルを当てる
