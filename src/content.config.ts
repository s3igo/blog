import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const schema = z.object({
    title: z.string(),
    tags: z.array(z.string().toLowerCase()),
    published: z.date(),
    updated: z.date().nullable(),
    draft: z.boolean(),
});

export type Schema = z.infer<typeof schema>;

const posts = defineCollection({
    loader: glob({ pattern: '**/[^_]*.md', base: './src/content/posts' }),
    schema,
});

export const collections = { posts };
