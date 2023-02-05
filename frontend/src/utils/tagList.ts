export const tagList = (tags: string[]): string =>
    tags.length ? tags.map((tag) => `#${tag}`).join(" ") : "";
