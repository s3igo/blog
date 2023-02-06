type Func = (tags: string[]) => string;

export const tagList: Func = (tags) => (tags.length ? tags.map((tag) => `#${tag}`).join(" ") : "");
