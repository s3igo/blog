import type { Params, Props } from './_static';
export { getStaticPaths } from './_static';
import type { APIContext } from 'astro';
import { image } from '~/features/og/image';

export const GET = async ({ params }: APIContext<Props, Params>) => {
    const title = `#${params.tag}の記事一覧`;

    return await image({ title, tags: [] });
};
