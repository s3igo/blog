import { Rotate } from './icons/line-md.tsx';
import { Metadata } from './metadata.tsx';

type Props = { children: string };

export const Updated = (props: Props) => (
    <Metadata icon={<Rotate />}>{props.children}</Metadata>
);
