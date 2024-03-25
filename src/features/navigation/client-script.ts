type Theme = 'light' | 'dark';
const getCurrentTheme = (): Theme =>
    (window.localStorage.getItem('theme') as Theme | null) ??
    (window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light');

export const loadTheme = () => {
    if (getCurrentTheme() === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme', 'material-theme');
    }
};

export const toggleTheme = () => {
    const currentTheme = getCurrentTheme();

    if (currentTheme === 'dark') {
        document.documentElement.classList.remove('dark');
        document.documentElement.setAttribute(
            'data-theme',
            'material-theme-lighter',
        );
    } else {
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme', 'material-theme');
    }

    window.localStorage.setItem(
        'theme',
        currentTheme === 'dark' ? 'light' : 'dark',
    );
};
