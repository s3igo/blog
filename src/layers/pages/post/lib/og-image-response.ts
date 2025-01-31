import type { ApiRoute } from '../../../shared/lib/index.ts';
import { OgImageResponse } from '../../../widgets/head/index.ts';
import type { Props } from '../api/generate-static-routes.ts';

export const GET: ApiRoute<{ props: Props }> = async ({ props }) =>
    new OgImageResponse(props.post.data);
