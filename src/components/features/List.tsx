import * as R from 'remeda';
import { type Component, For } from 'solid-js';
import type { Posts } from '~/domain/model/post';
import { Card } from './List/Card';

type Props = { posts: Posts };

export const List: Component<Props> = (props) => {
    const cards = R.pipe(
        props.posts,
        R.map(R.pick(['description', 'published', 'tags', 'title', 'updated', 'url'])),
        R.sortBy(({ published }) => published),
        R.reverse()
    );

    return (
        <main class="flex flex-col gap-4 sm:gap-6">
            <For each={cards}>{(card) => <Card {...card} />}</For>
        </main>
    );
};
