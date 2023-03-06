import { type Component, mergeProps } from 'solid-js';

export type Props = { text: string; block?: boolean };
type PrivateProps = Required<Props>;

const PrivateMetadata: Component<PrivateProps> = (props) => (
    <span
        class="text-sm text-foreground/60 sm:text-base truncate"
        classList={{ block: props.block }}
    >
        {props.text}
    </span>
);

export const Metadata: Component<Props> = (props) => {
    const localProps = mergeProps({ block: false }, props);
    return <PrivateMetadata {...localProps} />;
};
