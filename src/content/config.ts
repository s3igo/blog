import { defineCollection, z } from 'astro:content';

const schema = z.object({
    title: z.string(),
    tags: z.array(z.string().toLowerCase()),
    published: z.date(),
    updated: z.date().nullable(),
    draft: z.boolean(),
});

export type Schema = z.infer<typeof schema>;

const posts = defineCollection({
    type: 'content',
    schema,
});

export const collections = { posts };
