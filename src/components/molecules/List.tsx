import * as R from 'remeda';
import type { CollectionEntry } from 'astro:content';
import { type Component, For } from 'solid-js';
import { Card } from '../organisms/Card';

type Post = CollectionEntry<'posts'>;
type Props = {
    posts: Post[];
};

export const List: Component<Props> = (props) => {
    const sorted = R.pipe(
        props.posts,
        R.sortBy(({ data }: Post) => data.published),
        R.reverse()
    );
    const frontmatter = R.map(sorted, ({ data }: Post) => data);
    const needed = R.map(sorted, ({ body, slug }: Post) => ({ body, slug }));

    const cards = R.zipWith(frontmatter, needed, (a, b) => ({ ...a, ...b }));

    return (
        <main class="flex flex-col gap-4 sm:gap-6">
            <For each={cards}>{(card) => <Card {...card} />}</For>
        </main>
    );
};
