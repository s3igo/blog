import { type Component, mergeProps } from 'solid-js';
import { Metadata } from '../atoms/Metadata';

type Props = { name: string; truncate?: boolean };

export const Tag: Component<Props> = (props) => {
    const propsWithDefaultValue = mergeProps({ truncate: false }, props);
    return (
        <a
            href={`/tags/${propsWithDefaultValue.name}`}
            target="_blank"
            rel="noopener"
            class="hover:custom-shadow ml-[-6px] rounded-md border-2 border-transparent px-1 hover:border-secondary w-min max-w-full"
        >
            <Metadata
                text={`#${propsWithDefaultValue.name}`}
                block={propsWithDefaultValue.truncate}
            />
        </a>
    );
};
