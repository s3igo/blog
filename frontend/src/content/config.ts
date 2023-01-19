import { z, defineCollection } from "astro:content";

const posts = defineCollection({
    schema: {
        tags: z.array(z.string()),
        draft: z.literal(true).optional(),
        createdAt: z.date(),
        updatedAt: z.date().optional(),
    },
});

export const collections = { posts };
