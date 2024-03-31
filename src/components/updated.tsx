import { Rotate } from './icons/line-md';
import { Metadata } from './metadata';

type Props = { children: string };

export const Updated = (props: Props) => (
    <Metadata icon={<Rotate />}>{props.children}</Metadata>
);
