import type { Component } from 'solid-js';

type Props = { type: 'text'; text: string } | { type: 'link'; text: string; link: string };

export const Metadata: Component<Props> = (props) =>
    props.type === 'text' ? (
        <div class="rounded-full border-2 border-transparent px-3 py-1 bg-white w-max metadata dark:bg-gray-800">
            {props.text}
        </div>
    ) : (
        <a
            href={props.link}
            class="rounded-full border-2 border-transparent px-3 py-1 bg-white w-max dark:bg-gray-800 hover:border-cyan-500 block metadata"
        >
            {props.text}
        </a>
    );
