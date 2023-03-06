import { type Component, mergeProps } from 'solid-js';
import { Metadata } from '../atoms/Metadata';

type Props = { name: string; truncate?: boolean };
type PrivateProps = { url: string } & Required<Props>;

const PrivateTag: Component<PrivateProps> = (props) => (
    <a
        href={props.url}
        target="_blank"
        class="hover:custom-shadow ml-[-6px] rounded-md border-2 border-transparent px-1 hover:border-secondary w-min max-w-full"
    >
        <Metadata text={`#${props.name}`} block={props.truncate} />
    </a>
);

export const Tag: Component<Props> = (props) => {
    const localProps = mergeProps({ truncate: false }, props);
    const tagUrl = (name: string): string => `/tags/${name}`;
    const privateProps = { ...localProps, url: tagUrl(localProps.name) };
    return <PrivateTag {...privateProps} />;
};
