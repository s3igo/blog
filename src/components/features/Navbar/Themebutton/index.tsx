import {
    component$,
    useOnDocument,
    useSignal,
    useVisibleTask$,
    $,
} from '@builder.io/qwik';
import { MoonIcon } from './moon-icon';

const loadTheme = () => {
    if (window.localStorage.getItem('theme') === 'light') return;
    if (
        window.localStorage.getItem('theme') === 'dark' ||
        window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
        document.documentElement.classList.add('dark');
    }
};
const toggleTheme = () => {
    document.getElementById('theme-button')?.addEventListener('click', () => {
        // theme is set
        switch (window.localStorage.getItem('theme')) {
            case 'light':
                document.documentElement.classList.add('dark');
                window.localStorage.setItem('theme', 'dark');
                return;
            case 'dark':
                document.documentElement.classList.remove('dark');
                window.localStorage.setItem('theme', 'light');
                return;
        }
        // theme is not set
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.remove('dark');
            window.localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            window.localStorage.setItem('theme', 'dark');
        }
    });
};

export const ThemeButton = component$(() => {
    const buttonRef = useSignal<Element>();
    const theme = useSignal<'light' | 'dark'>();

    // initialize
    // useOnDocument(
    //     'astro:page-load',
    //     // eslint-disable-next-line
    //     $(() => loadTheme()),
    // );
    // useOnDocument(
    //     'astro:after-swap',
    //     // eslint-disable-next-line
    //     $(() => loadTheme()),
    // );

// const loadTheme = () => {
//     if (window.localStorage.getItem('theme') === 'light') return;
//     if (
//         window.localStorage.getItem('theme') === 'dark' ||
//         window.matchMedia('(prefers-color-scheme: dark)').matches
//     ) {
//         document.documentElement.classList.add('dark');
//     }
// };

    // initialize
    useVisibleTask$(() => {
        document.addEventListener('astro:page-load', loadTheme, {
            once: true,
        });
        document.addEventListener('astro:after-swap', loadTheme);
        theme.value =
            (window.localStorage.getItem('theme') as 'light' | 'dark' | null) ??
            window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light';
    });

    const handleClick = $(() => {
        theme.value = theme.value === 'light' ? 'dark' : 'light';
    });

    useVisibleTask$(({ track }) => {
        track(() => theme.value);
        if (theme.value === 'light') {
            document.documentElement.classList.remove('dark');
            window.localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            window.localStorage.setItem('theme', 'dark');
        }
    });

    return (
        <button
            ref={buttonRef}
            onClick$={handleClick}
            class="h-8 w-8 rounded-full border-2 border-transparent p-1 hover:border-maldives xl:h-12 xl:w-12 xl:p-2"
            aria-label="Toggle dark mode"
        >
            <MoonIcon />
        </button>
    );
});
