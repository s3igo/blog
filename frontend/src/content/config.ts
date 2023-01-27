import { z, defineCollection } from "astro:content";

const posts = defineCollection({
    schema: z.object({
        layout: z.enum(["~/layouts/Blog.astro"]),
        tags: z.array(z.string()).optional(),
        draft: z.literal(true).optional(),
        createdAt: z.date(),
        updatedAt: z.date().optional(),
    }),
});

export const collections = { posts };
