import { type Component, mergeProps } from 'solid-js';
import { Metadata } from '../atoms/Metadata';

type Props = { name: string; truncate?: boolean };
type ViewProps = { url: string } & Required<Props>;

const View: Component<ViewProps> = (props) => (
    <a
        href={props.url}
        target="_blank"
        rel="noopener"
        class="hover:custom-shadow ml-[-6px] rounded-md border-2 border-transparent px-1 hover:border-secondary w-min max-w-full"
    >
        <Metadata text={`#${props.name}`} block={props.truncate} />
    </a>
);

export const Tag: Component<Props> = (props) => {
    const local = mergeProps({ truncate: false }, props);
    const view = { ...local, url: `/tags/${local.name}` };
    return <View {...view} />;
};
