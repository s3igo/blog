import { z } from 'astro/zod';

export const layouts = {
    blog: '~/layouts/Blog.astro',
} as const;

export const frontmatterSchema = z.object({
    draft: z.literal(true).optional(),
    layout: z.literal(layouts.blog), // 複数になったらz.union()にする
    preview: z.string(),
    pubDate: z.date(),
    slug: z.string(),
    tags: z.array(z.string()),
    title: z.string(),
    updatedAt: z.date().nullable(),
});

export type Frontmatter = z.infer<typeof frontmatterSchema>;

if (import.meta.vitest) {
    const { describe, expect, test } = import.meta.vitest;
    describe('keyが不足するときにエラーを投げる', () => {
        test('previewがない', () => {
            expect(() => {
                frontmatterSchema.parse({
                    draft: true,
                    layout: layouts.blog,
                    pubDate: new Date(),
                    slug: 'slug',
                    tags: ['tag'],
                    title: 'title',
                    updatedAt: new Date(),
                });
            }).toThrowError('Required');
        });
        test('slugがない', () => {
            expect(() => {
                frontmatterSchema.parse({
                    draft: true,
                    layout: layouts.blog,
                    preview: 'preview',
                    pubDate: new Date(),
                    tags: ['tag'],
                    title: 'title',
                    updatedAt: new Date(),
                });
            }).toThrowError('Required');
        });
        test('updatedAtがない', () => {
            expect(() => {
                frontmatterSchema.parse({
                    draft: true,
                    layout: layouts.blog,
                    preview: 'preview',
                    pubDate: new Date(),
                    slug: 'slug',
                    tags: ['tag'],
                    title: 'title',
                });
            }).toThrowError('Required');
        });
    });
}
