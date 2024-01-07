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
    <a
        href={props.url}
        rel="prefetch-intent"
        class="rounded-3xl border-2 border-transparent bg-white px-5 py-4 hover:border-maldives dark:bg-midnight-express sm:px-8 sm:py-6"
    >
        <article>
            <div class="flex max-sm:flex-col sm:items-center">
                <div class="flex items-center">
                    <span class="metadata">{props.published}</span>
                    <Show when={props.updated !== undefined}>
                        <Separator.Root
                            orientation="vertical"
                            class="mx-[6px] h-4 rounded-sm border-none bg-blue-blouse pr-px md:pr-[1.5px]"
                        />
                        <span class="metadata">{`↻ ${props.updated}`}</span>
                    </Show>
                </div>
                <Show when={props.tags.length !== 0}>
                    <Separator.Root
                        orientation="vertical"
                        class="mx-[6px] h-4 rounded-sm border-none bg-blue-blouse pr-px max-sm:hidden md:pr-[1.5px]"
                    />
                    <div class="flex gap-[6px]">
                        <For each={props.tags}>{(tag) => <span class="metadata">#{tag}</span>}</For>
                    </div>
                </Show>
            </div>
            <h2 class="py-1.5 text-xl before:text-maldives before:content-['#_'] xl:text-2xl">
                {props.title}
            </h2>
            <p class="line-clamp-5 xl:text-lg">{props.description}</p>
        </article>
    </a>
);
