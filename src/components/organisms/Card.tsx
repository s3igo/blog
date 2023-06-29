import { Separator } from '@kobalte/core';
import { type Component, createSignal, For, Show } from 'solid-js';
// import type { Frontmatter } from '~/types';
import { postUrl } from '~/utils/constructString';
// import { isNever } from '~/utils/types';
import { Metadata } from '../atoms/Metadata';
import { Tag } from '../molecules/Tag';

// export type Props = Omit<Frontmatter, 'layout'>;
type Props = {
    title: string;
    slug: string;
    tags: string[];
    publishedAt: string;
    updatedAt?: string;
    preview: string;
};
// const cardConsumes = ['pubDate', 'slug', 'updatedAt'] as const;
// type ViewProps = {
//     date: string;
//     url: string;
//     tagHovered: Accessor<boolean>;
//     setTagHovered: Setter<boolean>;
// } & Omit<Props, (typeof cardConsumes)[number]>;
// const viewConsumes = ['tagHovered'] as const;
// const infoConsumes = ['date', 'tags', 'setTagHovered'] as const;
// type infoProps = Pick<ViewProps, (typeof infoConsumes)[number]>;
// const contentConsumes = ['url', 'title', 'preview'] as const;
// type ContentProps = Pick<ViewProps, (typeof contentConsumes)[number]>;
// const properties = [...cardConsumes, ...viewConsumes, ...infoConsumes, ...contentConsumes] as const;
// isNever<Exclude<keyof Props, (typeof properties)[number]>>(); // exhaustiveness check

// const Info: Component<infoProps> = (props) => (
//     <div class="flex gap-1 items-center flex-wrap">
//         <Metadata text={props.date} />
//         <Show when={props.tags.length !== 0}>
//             <Separator.Root
//                 orientation="vertical"
//                 class="h-4 pr-px border-none bg-foreground/60 mx-1"
//             />
//         </Show>
//         <For each={props.tags}>
//             {(tag) => (
//                 <div
//                     onMouseEnter={() => props.setTagHovered(true)}
//                     onMouseLeave={() => props.setTagHovered(false)}
//                 >
//                     <Tag name={tag} />
//                 </div>
//             )}
//         </For>
//     </div>
// );

// const Content: Component<ContentProps> = (props) => (
//     <a href={props.url}>
//         <h2 class="mb-2.5 border-b border-tertiary pb-1.5 text-xl text-primary sm:text-2xl">
//             {props.title}
//         </h2>
//         <p class="bg-gradient-to-b from-foreground via-foreground/80 to-foreground/20 bg-clip-text text-transparent line-clamp-5 sm:text-lg">
//             {props.preview}
//         </p>
//     </a>
// );

// const View: Component<ViewProps> = (props) => {
//     const [local, info, content, others] = splitProps(
//         props,
//         viewConsumes,
//         infoConsumes,
//         contentConsumes
//     );
//     others satisfies Record<string, never>; // exhaustiveness check
//     return (
//         <article
//             data-tagHovered={local.tagHovered()}
//             class="hover:custom-shadow rounded-2xl border-2 border-solid border-transparent hover:border-secondary data-[tagHovered=true]:border-transparent data-[tagHovered=true]:shadow-none"
//         >
//             <div class="py-4 px-2 sm:px-5">
//                 <Info {...info} />
//                 <Content {...content} />
//             </div>
//         </article>
//     );
// };

export const Card: Component<Props> = (props) => {
    const date =
        props.publishedAt + (props.updatedAt !== null ? ` last updated on ${props.updatedAt}` : '');
    const url = postUrl(props.publishedAt, props.slug);
    const [tagHovered, setTagHovered] = createSignal(false);
    // const view = { ...others, date, url };
    // return <View {...view} tagHovered={tagHovered} setTagHovered={setTagHovered} />;
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
                        {props.title}
                    </h2>
                    <p class="bg-gradient-to-b from-foreground via-foreground/80 to-foreground/20 bg-clip-text text-transparent line-clamp-5 sm:text-lg">
                        {props.preview}
                    </p>
                </a>
            </div>
        </article>
    );
};
