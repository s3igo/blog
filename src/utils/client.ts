type Theme = 'light' | 'dark';

export const getCurrentTheme = (): Theme =>
    (window.localStorage.getItem('theme') as Theme | null) ??
    (window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light');
