import { first3Sentences, truncate } from '~/utils/string';
import { type Companion, Opaque } from '~/utils/types';

type BodySchema = {
    /** 記事のタイトル */
    title: string;
    /** 記事の本文 */
    content: string;
    /** 記事の概要（graphemeベースで500文字） */
    description: string;
    /** 記事の最初の3文 */
    firstThreeSentences: string;
};

export type Body = Opaque<BodySchema, 'Body'>;

const transformBody = (value: string): BodySchema => {
    const [_, ...textStartWithTitle] = value.split('# ');
    const [title, ...body] = textStartWithTitle.join('').split('\n');

    if (!title) throw new Error('title is undefined');

    return {
        content: body.join(''),
        description: truncate(body.join(''), 500),
        firstThreeSentences: first3Sentences(body.join('')),
        title: title,
    };
};

export const Body: Companion<string, Body> = {
    new: (body) => Opaque.create<Body, BodySchema>(transformBody(body)),
};

if (import.meta.vitest) {
    const { describe, expect, test } = import.meta.vitest;

    describe('content', () => {
        test('content', () => {
            expect(Body.new('# title\ncontent').content).toBe('content');
        });
        test('content with new line', () => {
            expect(Body.new('# title\ncontent\n').content).toBe('content');
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
