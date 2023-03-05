import { type Component, For } from 'solid-js';
import { Card, type Props as CardProps } from '../organisms/Card';

export type Props = {
    cards: CardProps[];
};
export const List: Component<Props> = ({ cards }) => {
    return (
        <main class="flex flex-col gap-4 sm:gap-6">
            <For each={cards}>{(card) => <Card {...card} />}</For>
        </main>
    );
};
