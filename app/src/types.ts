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
