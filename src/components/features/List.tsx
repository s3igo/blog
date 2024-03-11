import * as R from 'remeda';
import { type Component, For } from 'solid-js';
import { Card } from './List/Card';
import type { Posts } from '~/domain/values/post';

type Props = { posts: Posts };

export const List: Component<Props> = (props) => {
    const cards = R.pipe(
        props.posts,
        R.map(
            R.pick([
                'description',
                'published',
                'tags',
                'title',
                'updated',
                'url',
            ]),
        ),
        R.sortBy(({ published }) => published),
        R.reverse(),
    );

    return (
        <main class="flex flex-col gap-4 md:gap-6">
            <For each={cards}>{(card) => <Card {...card} />}</For>
        </main>
    );
};
