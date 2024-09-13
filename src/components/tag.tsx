import { HashSmall } from './icons/line-md.ts';
import { Metadata } from './metadata.ts';

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
