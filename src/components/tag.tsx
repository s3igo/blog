import { HashSmall } from './icons/line-md';
import { Metadata } from './metadata';

type Props = { name: string; link?: boolean };

export const Tag = (props: Props) => (
    <Metadata
        as={props.link ? 'a' : 'div'}
        href={`/tags/${props.name}`}
        icon={<HashSmall />}
    >
        {props.name}
    </Metadata>
);
