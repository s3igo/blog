import { Rotate } from './icons/line-md.ts';
import { Metadata } from './metadata.ts';

type Props = { children: string };

export const Updated = (props: Props) => (
    <Metadata icon={<Rotate />}>{props.children}</Metadata>
);
