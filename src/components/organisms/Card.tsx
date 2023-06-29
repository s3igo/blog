import { Separator } from '@kobalte/core';
import { type Component, createSignal, For, Show } from 'solid-js';
import { format } from '~/utils/dateToString';
import { truncate } from '~/utils/string';
import { Metadata } from '../atoms/Metadata';
import { Tag } from '../molecules/Tag';

// export type Props = Omit<Frontmatter, 'layout'>;
type Props = {
    tags: string[];
    published: Date;
    updated: Date | null;
    body: string;
    slug: string;
};

export const Card: Component<Props> = (props) => {
    const [name] = props.slug.split('/').slice(-1);
    const publishedAt = format(props.published);
    const updatedAt = props.updated && format(props.updated);
    const url = name ? `/posts/${publishedAt}/${name}` : '/';
    console.log(props.body.split('\n'));
    const [h1] = props.body.split('\n').filter((line) => line.startsWith('# '));
    // TODO: エラーを返す
    const title = h1 ? h1.replace('# ', '') : 'No title';
    const preview = truncate(props.body, 500);
    const date = publishedAt + updatedAt && ` last updated on ${updatedAt}`;
    const [tagHovered, setTagHovered] = createSignal(false);
    return (
        <article
            data-tagHovered={tagHovered()}
            class="hover:custom-shadow rounded-2xl border-2 border-solid border-transparent hover:border-secondary data-[tagHovered=true]:border-transparent data-[tagHovered=true]:shadow-none"
        >
            <div class="py-4 px-2 sm:px-5">
                <div class="flex gap-1 items-center flex-wrap">
                    <Metadata text={date} />
                    <Show when={props.tags.length !== 0}>
                        <Separator.Root
                            orientation="vertical"
                            class="h-4 pr-px border-none bg-foreground/60 mx-1"
                        />
                    </Show>
                    <For each={props.tags}>
                        {(tag) => (
                            <div
                                onMouseEnter={() => setTagHovered(true)}
                                onMouseLeave={() => setTagHovered(false)}
                            >
                                <Tag name={tag} />
                            </div>
                        )}
                    </For>
                </div>
                <a href={url}>
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
