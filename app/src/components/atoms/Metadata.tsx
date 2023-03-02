import type { Component } from 'solid-js';

export type Props = { text: string; block?: boolean };
export const Metadata: Component<Props> = ({ text, block = false }) => (
    <span class="text-sm text-foreground/60 sm:text-base truncate" classList={{ block }}>
        {text}
    </span>
);
