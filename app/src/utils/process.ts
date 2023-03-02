import * as R from 'remeda';
import type { Props as CardProps } from '~/components/organisms/Card';

export const cardsToDescending = (cards: CardProps[]): CardProps[] => {
    return R.pipe(
        cards,
        R.sortBy(({ pubDate }) => Number(pubDate)),
        R.reverse()
    );
};

if (import.meta.vitest) {
    const { test, expect, describe } = import.meta.vitest;
    describe('Cardの配列を降順に並び替える', () => {
        const expectedCase: CardProps[] = [
            {
                title: 'title3',
                slug: 'slug3',
                tags: ['tag3', 'tag4', 'tag5'],
                preview: 'preview3',
                pubDate: new Date('2021-01-03'),
            },
            {
                title: 'title2',
                slug: 'slug2',
                tags: ['tag1', 'tag2'],
                preview: 'preview2',
                pubDate: new Date('2021-01-02'),
                updatedAt: new Date('2021-01-02'),
            },
            {
                title: 'title1',
                slug: 'slug1',
                tags: ['tag1'],
                preview: 'preview1',
                pubDate: new Date('2021-01-01'),
            },
        ];
        test('pubDateが新しい順に並んでいる', () => {
            const testCase: CardProps[] = [
                {
                    title: 'title1',
                    slug: 'slug1',
                    tags: ['tag1'],
                    preview: 'preview1',
                    pubDate: new Date('2021-01-01'),
                },
                {
                    title: 'title2',
                    slug: 'slug2',
                    tags: ['tag1', 'tag2'],
                    preview: 'preview2',
                    pubDate: new Date('2021-01-02'),
                    updatedAt: new Date('2021-01-02'),
                },
                {
                    title: 'title3',
                    slug: 'slug3',
                    tags: ['tag3', 'tag4', 'tag5'],
                    preview: 'preview3',
                    pubDate: new Date('2021-01-03'),
                },
            ];
            expect(cardsToDescending(testCase)).toEqual(expectedCase);
        });
        test('pubDateが古い順に並んでいる', () => {
            const testCase: CardProps[] = [
                {
                    title: 'title3',
                    slug: 'slug3',
                    tags: ['tag3', 'tag4', 'tag5'],
                    preview: 'preview3',
                    pubDate: new Date('2021-01-03'),
                },
                {
                    title: 'title2',
                    slug: 'slug2',
                    tags: ['tag1', 'tag2'],
                    preview: 'preview2',
                    pubDate: new Date('2021-01-02'),
                    updatedAt: new Date('2021-01-02'),
                },
                {
                    title: 'title1',
                    slug: 'slug1',
                    tags: ['tag1'],
                    preview: 'preview1',
                    pubDate: new Date('2021-01-01'),
                },
            ];
            expect(cardsToDescending(testCase)).toEqual(expectedCase);
        });
        test('pubDateが混在している', () => {
            const testCase: CardProps[] = [
                {
                    title: 'title3',
                    slug: 'slug3',
                    tags: ['tag3', 'tag4', 'tag5'],
                    preview: 'preview3',
                    pubDate: new Date('2021-01-03'),
                },
                {
                    title: 'title1',
                    slug: 'slug1',
                    tags: ['tag1'],
                    preview: 'preview1',
                    pubDate: new Date('2021-01-01'),
                },
                {
                    title: 'title2',
                    slug: 'slug2',
                    tags: ['tag1', 'tag2'],
                    preview: 'preview2',
                    pubDate: new Date('2021-01-02'),
                    updatedAt: new Date('2021-01-02'),
                },
            ];
            expect(cardsToDescending(testCase)).toEqual(expectedCase);
        });
    });
}
