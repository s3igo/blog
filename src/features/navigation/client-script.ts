export type Theme = 'light' | 'dark';
export const getCurrentTheme = (): Theme =>
    (window.localStorage.getItem('theme') as Theme | null) ??
    (window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light');

export const loadTheme = () => {
    const currentTheme = getCurrentTheme();

    if (currentTheme === 'dark') {
        document.documentElement.classList.add('dark');
    }
};

export const toggleTheme = () => {
    const currentTheme = getCurrentTheme();

    if (currentTheme === 'dark') {
        document.documentElement.classList.remove('dark');
    } else {
        document.documentElement.classList.add('dark');
    }

    window.localStorage.setItem(
        'theme',
        currentTheme === 'dark' ? 'light' : 'dark',
    );

    // document.dispatchEvent(
    //     new CustomEvent('theme-changed', {
    //         detail: currentTheme === 'dark' ? 'light' : 'dark',
    //     }),
    // );
};
