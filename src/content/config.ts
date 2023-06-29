import { defineCollection, z } from 'astro:content';

const schema = z.object({
    published: z.date(),
    tags: z.array(z.string()),
    updated: z.date().nullable(),
});

export type Schema = z.infer<typeof schema>;

const posts = defineCollection({
    schema,
    type: 'content',
});

export const collections = { posts };
