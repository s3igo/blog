type Theme = 'light' | 'dark';
export const getCurrentTheme = (): Theme =>
    (window.localStorage.getItem('theme') as Theme | null) ??
    (window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light');

export const loadTheme = () => {
    if (getCurrentTheme() === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
};

export const toggleTheme = () => {
    const nextTheme = getCurrentTheme() === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', nextTheme);
    window.localStorage.setItem('theme', nextTheme);
};
