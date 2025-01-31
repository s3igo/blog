import type { ApiRoute } from '../../../shared/lib/index.ts';
import { OgImageResponse } from '../../../widgets/head/index.ts';
import type { Params } from '../api/generate-static-routes.ts';

export const GET: ApiRoute<{ params: Params }> = async ({ params }) =>
    new OgImageResponse({ title: `#${params.tag}の記事一覧` });
