import type { Component } from 'solid-js';
import { Metadata } from '../atoms/Metadata';

type Props = { name: string; truncate?: boolean };

const tagUrl = (name: string): string => `/tags/${name}`;
export const Tag: Component<Props> = ({ name, truncate = false }) => {
    return (
        <a
            href={tagUrl(name)}
            target="_blank"
            class="hover:custom-shadow ml-[-6px] rounded-md border-2 border-transparent px-1 hover:border-secondary w-min max-w-full"
        >
            <Metadata text={`#${name}`} block={truncate} />
        </a>
    );
};
