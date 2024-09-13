import type { Params, Props } from './_static.ts';
export { getStaticPaths } from './_static.ts';
import type { APIRoute } from 'astro';
import { image } from '~/features/og/image';

export const GET: APIRoute<Props, Params> = async ({ params }) =>
    await image({ title: `#${params.tag}の記事一覧`, tags: [] });
