import { z } from "astro/zod";

// @types/mdastに型あるけど、そこまで厳密性必要ないため使わない
type Func = (tree: any, file: any) => void;
export type Plugin = () => Func;

// レイアウトの種類
export const layouts = {
    Blog: "~/layouts/Blog.astro",
} as const;

// frontmatterの型定義
export const frontmatterSchema = z.object({
    layout: z.literal(layouts.Blog), // 複数になったらz.union()にする
    title: z.string(),
    tags: z.array(z.string()).optional(),
    draft: z.literal(true).optional(),
    createdAt: z.date(),
    updatedAt: z.date().optional(),
});

export type Frontmatter = z.infer<typeof frontmatterSchema>;
