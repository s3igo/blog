import { postPathnameBuilder } from '../layers/app/routes/index.ts';
import { defineEndpoint } from '../layers/pages/rss/index.ts';

export const GET = defineEndpoint({ postPathnameBuilder });
