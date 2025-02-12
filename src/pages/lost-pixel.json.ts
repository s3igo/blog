import {
    postPathnameBuilder,
    tagPathnameBuilder,
} from '../layers/app/routes/index.ts';
import { defineEndpoint } from '../layers/pages/lost-pixel/index.ts';

export const GET = defineEndpoint({ postPathnameBuilder, tagPathnameBuilder });
