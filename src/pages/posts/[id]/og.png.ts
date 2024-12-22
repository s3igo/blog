import type { Props } from './_static.ts';
export { getStaticPaths } from './_static.ts';
import type { APIRoute } from 'astro';
import { image } from '~/features/og/image';

export const GET: APIRoute<Props> = async ({ props }) =>
    await image(props.post.data);
