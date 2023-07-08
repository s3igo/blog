import { type Component, mergeProps } from 'solid-js';
import type { Tag as TagType } from '~/domain/values/post';

type Props = { name: TagType; link?: boolean };

export const Tag: Component<Props> = (props) => {
    const merged = mergeProps({ link: true }, props);
    return merged.link ? (
        <a
            href={`/tags/${merged.name}`}
            target="_blank"
            rel="noopener"
            class="rounded-full border-2 border-transparent px-3 py-1 bg-white w-max hover:border-slate-400 block"
        >
            <span class="metadata">#{merged.name}</span>
        </a>
    ) : (
        <div class="metadata">#{merged.name}</div>
    );
};
