import * as R from 'remeda';
import type { MarkdownInstance } from 'astro';
import type { Props as CardProps } from '~/components/organisms/Card';
import type { Frontmatter } from '~/types';

export const globPosts = (): MarkdownInstance<Frontmatter>[] => {
    const postImportResult = import.meta.glob('../data/posts/*.md', { eager: true });
    const posts = Object.values(postImportResult) as MarkdownInstance<Frontmatter>[];
    return posts.filter(({ frontmatter }) => !frontmatter.tags.includes('draft'));
};

export const cardsToDescending = (cards: CardProps[]): CardProps[] => {
    return R.pipe(
        cards,
        R.sortBy(({ pubDate }) => Number(pubDate)),
        R.reverse()
    );
};

if (import.meta.vitest) {
    const { describe, expect, test } = import.meta.vitest;
    describe('Cardの配列を降順に並び替える', () => {
        const card1: CardProps = {
            preview: 'preview1',
            pubDate: new Date('2021-01-01'),
            slug: 'slug1',
            tags: ['tag1'],
            title: 'title1',
            updatedAt: null,
        };
        const card2: CardProps = {
            preview: 'preview2',
            pubDate: new Date('2021-01-02'),
            slug: 'slug2',
            tags: ['tag1', 'tag2'],
            title: 'title2',
            updatedAt: new Date('2021-01-02'),
        };
        const card3: CardProps = {
            preview: 'preview3',
            pubDate: new Date('2021-01-03'),
            slug: 'slug3',
            tags: ['tag3', 'tag4', 'tag5'],
            title: 'title3',
            updatedAt: null,
        };
        const expectedCase: CardProps[] = [card3, card2, card1];
        test('pubDateが新しい順に並んでいる', () => {
            const testCase: CardProps[] = [card1, card2, card3];
            expect(cardsToDescending(testCase)).toEqual(expectedCase);
        });
        test('pubDateが古い順に並んでいる', () => {
            const testCase: CardProps[] = [card3, card2, card1];
            expect(cardsToDescending(testCase)).toEqual(expectedCase);
        });
        test('pubDateが混在している', () => {
            const testCase: CardProps[] = [card1, card3, card2];
            expect(cardsToDescending(testCase)).toEqual(expectedCase);
        });
    });
}
