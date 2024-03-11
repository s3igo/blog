import type { Component } from 'solid-js';

type Props =
    | { type: 'text'; text: string }
    | { type: 'link'; text: string; link: string };

export const Metadata: Component<Props> = (props) =>
    props.type === 'text' ? (
        <div class="metadata w-max rounded-full border-2 border-transparent bg-white px-3 py-1 dark:bg-midnight-express">
            {props.text}
        </div>
    ) : (
        <a
            href={props.link}
            class="metadata block w-max rounded-full border-2 border-transparent bg-white px-3 py-1 hover:border-maldives dark:bg-midnight-express"
        >
            {props.text}
        </a>
    );
