import type { Props } from './_static';
export { getStaticPaths } from './_static';
import type { APIRoute } from 'astro';
import { image } from '~/features/og/image';

export const GET: APIRoute<Props> = async ({ props }) =>
    await image(props.post.data);
