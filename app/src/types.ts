import type { Prettify } from './utils/types';
import { z } from 'astro/zod';

// レイアウトの種類
export const layouts = {
    blog: '~/layouts/Blog.astro',
} as const;

// frontmatterの型定義
export const frontmatterSchema = z.object({
    layout: z.literal(layouts.blog), // 複数になったらz.union()にする
    title: z.string(),
    tags: z.array(z.string()).nonempty().optional(),
    description: z.string(),
    draft: z.literal(true).optional(),
    createdAt: z.date(),
    updatedAt: z.date().optional(),
});

export type Frontmatter = z.infer<typeof frontmatterSchema>;

// 記事をリスト表示する際のカードの型
export type Card = Prettify<Omit<Frontmatter, 'draft' | 'layout'> & { url: string }>;
