type Func = (tags: string[]) => string;

export const toStr: Func = (tags) => (tags.length ? tags.map((tag) => `#${tag}`).join(' ') : '');
