import { type Component, For } from 'solid-js';
import { Card, type Props as CardProps } from '../organisms/Card';

export type Props = {
    cards: CardProps[];
};

export const List: Component<Props> = (props) => (
    <main class="flex flex-col gap-4 sm:gap-6">
        <For each={props.cards}>{(card) => <Card {...card} />}</For>
    </main>
);
