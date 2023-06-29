import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
    schema: z.object({
        layout: z.literal('~/layouts/Blog.astro'),
        pubDate: z.date(),
        tags: z.array(z.string()),
        updatedAt: z.date().nullable(),
    }),
    type: 'content',
});

export const collections = { posts };
