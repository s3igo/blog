import { defineCollection, z } from 'astro:content';

const schema = z.object({
    title: z.string(),
    published: z.date(),
    updated: z.date().nullable(),
    tags: z.array(z.string()),
});

export type Schema = z.infer<typeof schema>;

const posts = defineCollection({
    type: 'content',
    schema,
});

export const collections = { posts };
