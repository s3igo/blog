// @vitest-environment jsdom
import { fromMarkdown } from 'mdast-util-from-markdown';
import { toString } from 'mdast-util-to-string';
import { first3Sentences, truncate } from '~/utils/string';
import { type Companion, Opaque } from '~/utils/types';

/**
 * 記事のタイトル
 * @package
 */
export type Title = Opaque<string, 'Title'>;
/** @package */
export type TextContent = Opaque<string, 'TextContent'>;
/** @package */
export type Description = Opaque<string, 'Description'>;
/**
 * 記事の最初の3文
 * @package
 */
export type FirstThreeSentences = Opaque<string, 'FirstThreeSentences'>;

type BodySchema = {
    title: Title;
    textContent: TextContent;
    description: Description;
    firstThreeSentences: FirstThreeSentences;
};

const transformBody = (value: string): BodySchema => {
    const mdast = fromMarkdown(value);
    const title = toString(
        mdast.children.find((node) => node.type === 'heading' && node.depth === 1)
    );
    const body = toString(mdast.children.filter((node) => node.type !== 'heading'));

    if (!title) throw new Error('title is undefined');

    return {
        description: Opaque.create<Description, 'Description'>(truncate(body, 500)),
        firstThreeSentences: Opaque.create<FirstThreeSentences, 'FirstThreeSentences'>(
            first3Sentences(body)
        ),
        textContent: Opaque.create<TextContent, 'TextContent'>(body),
        title: Opaque.create<Title, 'Title'>(title),
    };
};

/** @package */
export type Body = Opaque<BodySchema, 'Body'>;
export const Body: Companion<string, Body> = {
    new: (body) => Opaque.create<Body, 'Body'>(transformBody(body)),
};

if (import.meta.vitest) {
    const { describe, expect, test } = import.meta.vitest;

    describe('content', () => {
        test('content', () => {
            expect(Body.new('# title\ncontent').textContent).toBe('content');
        });
        test('content with new line', () => {
            expect(Body.new('# title\ncontent\n').textContent).toBe('content');
        });
    });
    describe('description', () => {
        test('description', () => {
            expect(Body.new('# title\ncontent').description).toBe('content');
        });
        test('description with new line', () => {
            expect(Body.new('# title\ncontent\n').description).toBe('content');
        });
        test('description with over 500 characters', () => {
            expect(Body.new('# title\n' + 'a'.repeat(501)).description).toBe(
                'a'.repeat(500) + '...'
            );
        });
    });
    describe('title', () => {
        test('title', () => {
            expect(Body.new('# title\ncontent').title).toBe('title');
        });
        test('title with new line', () => {
            expect(Body.new('# title\ncontent\n').title).toBe('title');
        });
        test('title with no title', () => {
            expect(() => Body.new('content')).toThrow('title is undefined');
        });
    });
    describe('firstThreeSentences', () => {
        test('firstThreeSentences', () => {
            expect(Body.new('# title\ncontent').firstThreeSentences).toBe('content');
        });
        test('firstThreeSentences with 3文より長い場合', () => {
            expect(Body.new('# title\nあいう。えお。かきく。けこ。').firstThreeSentences).toBe(
                'あいう。えお。かきく。'
            );
        });
    });
}
