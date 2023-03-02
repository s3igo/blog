import type { Component } from 'solid-js';
import type { Props as CardProps } from '../organisms/Card';
import { Card } from '../organisms/Card';

export type Props = {
    cards: CardProps[];
};
export const List: Component<Props> = ({ cards }) => {
    return (
        <main class="flex flex-col gap-4 sm:gap-6">
            {cards.map((card) => (
                <Card {...card} />
            ))}
        </main>
    );
};
