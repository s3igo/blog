import type { Component } from 'solid-js';

export type Props = { text: string; block?: boolean };
export const Metadata: Component<Props> = ({ block = false, text }) => (
    <span class="text-sm text-foreground/60 sm:text-base truncate" classList={{ block }}>
        {text}
    </span>
);
