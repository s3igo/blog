import type { Props } from './_static';
export { getStaticPaths } from './_static';
import type { APIContext } from 'astro';
import { image } from '~/features/og/image';

export const GET = async ({ props }: APIContext<Props>) =>
    await image(props.post.data);
