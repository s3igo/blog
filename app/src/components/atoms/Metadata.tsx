import type { Component } from 'solid-js';

type Props = { text: string };
export const Metadata: Component<Props> = ({ text }) => (
    <span class="text-sm text-foreground/60 sm:text-base">{text}</span>
);
