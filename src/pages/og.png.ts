import { PAGE_TITLE } from '~/constants';
import { image } from '~/features/og/image';

export const GET = async () => await image({ title: PAGE_TITLE, tags: [] });
