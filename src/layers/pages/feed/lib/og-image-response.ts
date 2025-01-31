import type { ApiRoute } from '../../../shared/lib/index.ts';
import { OgImageResponse } from '../../../widgets/head/index.ts';

export const GET: ApiRoute = async () => new OgImageResponse();
