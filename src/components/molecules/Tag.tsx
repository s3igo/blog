import type { Component } from 'solid-js';

type Props = { name: string };

export const Tag: Component<Props> = (props) => (
    <a
        href={`/tags/${props.name}`}
        target="_blank"
        rel="noopener"
        class="hover:custom-shadow ml-[-6px] rounded-md border-2 border-transparent px-1 hover:border-secondary w-min max-w-full"
    >
        <span class="metadata">#{props.name}</span>
    </a>
);
