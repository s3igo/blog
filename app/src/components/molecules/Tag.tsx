import type { Component } from 'solid-js';
import { Metadata } from '../atoms/Metadata';

const tagUrl = (name: string): string => `/tags/${name}`;

type Props = { name: string };
export const Tag: Component<Props> = ({ name }) => {
    return (
        <a
            href={tagUrl(name)}
            target="_blank"
            class="hover:custom-shadow ml-[-6px] w-max rounded-md border-2 border-transparent px-1 hover:border-secondary"
        >
            <Metadata text={`#${name}`} />
        </a>
    );
};
