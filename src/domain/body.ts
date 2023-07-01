import { truncate } from '~/utils/string';
import { newType } from '~/utils/types';
import type { Companion } from '~/utils/types';

type BodySchema = {
    title: string;
    content: string;
    description: string;
};

export type Body = BodySchema & { readonly brand: unique symbol };

const transformBody = (value: string): BodySchema => {
    const [_, ...textStartWithTitle] = value.split('# ');
    const [title, ...body] = textStartWithTitle.join('').split('\n');

    return {
        content: body.join(''),
        description: truncate(body.join(''), 500),
        title: title || 'No Title',
    };
};

export const Body: Companion<string, Body> = {
    new: (body) => newType<BodySchema, Body>(transformBody(body)),
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
            expect(Body.new('content').title).toBe('No Title');
        });
    });
}
