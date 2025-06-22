import type { Post } from '../../../shared/api/index.ts';
import { dateToStr, type PathnameBuilder } from '../../../shared/lib/index.ts';
import type { Card } from '../model/types.ts';

type AdaptPostOptions = {
    cardPathnameBuilder: PathnameBuilder;
};

export const adaptPost =
    ({ cardPathnameBuilder }: AdaptPostOptions) =>
    ({ id, data }: Post): Card => ({
        title: data.title,
        tags: data.tags,
        published: dateToStr(data.published),
        updated: data.updated ? dateToStr(data.updated) : undefined,
        url: cardPathnameBuilder(id),
    });
