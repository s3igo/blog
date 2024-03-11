import { type Component, mergeProps } from 'solid-js';
import { Metadata } from './Metadata';
import type { Tag as TagType } from '~/domain/values/post';

type Props = { name: TagType; link?: boolean };

export const Tag: Component<Props> = (props) =>
    mergeProps({ link: true }, props).link ? (
        <Metadata
            type="link"
            text={`#${props.name}`}
            link={`/tags/${props.name}`}
        />
    ) : (
        <Metadata type="text" text={`#${props.name}`} />
    );
