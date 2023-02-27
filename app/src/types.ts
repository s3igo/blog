import { z } from 'astro/zod';
import type { Prettify } from './utils/types';

export const layouts = {
    blog: '~/layouts/Blog.astro',
} as const;

export const frontmatterSchema = z.object({
    layout: z.literal(layouts.blog), // 複数になったらz.union()にする
    title: z.string(),
    slug: z.string(),
    tags: z.array(z.string()).nonempty().optional(),
    preview: z.string(),
    draft: z.literal(true).optional(),
    pubDate: z.date(),
    updatedAt: z.date().optional(),
});

export type Frontmatter = z.infer<typeof frontmatterSchema>;

// 記事をリスト表示する際のカードの型
export type Card = Prettify<Omit<Frontmatter, 'draft' | 'layout'> & { url: string }>;
