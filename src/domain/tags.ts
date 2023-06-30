import { newType } from '~/utils/types';
import type { Companion } from '~/utils/types';

type TagsSchema = {
    sort: () => TagsSchema;
    unique: () => TagsSchema;
    readonly value: string[];
};

type Tags = TagsSchema & { readonly brand: unique symbol };

const transformTags = (value: string[]): TagsSchema => ({
    sort() {
        return transformTags(this.value.sort());
    },
    unique() {
        return transformTags([...new Set(this.value)]);
    },
    value,
});

export const Tags: Companion<string[], Tags> = {
    new: (tags) => newType(transformTags(tags)),
};

if (import.meta.vitest) {
    const { describe, expect, test } = import.meta.vitest;

    describe('Tags', () => {
        test('sort', () => {
            expect(Tags.new(['b', 'a']).sort().value).toEqual(['a', 'b']);
        });
        test('unique', () => {
            expect(Tags.new(['a', 'a']).unique().value).toEqual(['a']);
        });
        test('unique and sort', () => {
            expect(Tags.new(['b', 'a', 'a']).unique().sort().value).toEqual(['a', 'b']);
        });
    });
}
