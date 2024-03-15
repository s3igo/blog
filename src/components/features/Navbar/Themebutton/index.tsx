import {
    $,
    component$,
    useOnDocument,
    useSignal,
    useVisibleTask$,
} from '@builder.io/qwik';
import { Icon } from './icon';
import { type Theme, loadTheme, getCurrentTheme } from './client-script';

// viewtransitionによってページ遷移するとtrackが効かなくなる

export const ThemeButton = component$(() => {
    const theme = useSignal<Theme>();

    useOnDocument(
        ['astro:page-load', 'astro:after-swap'],
        // eslint-disable-next-line
        $(() => loadTheme()),
    );

    // on mount
    useVisibleTask$(() => {
        console.log('getcurrenttheme', getCurrentTheme());
        theme.value = getCurrentTheme();
    });

    // toggle theme
    useVisibleTask$(({ track }) => {
        const currentTheme = track(theme);
        console.log('currentTheme', currentTheme);

        if (currentTheme === 'dark') {
            document.documentElement.classList.remove('dark');
        } else {
            document.documentElement.classList.add('dark');
        }

        window.localStorage.setItem(
            'theme',
            currentTheme === 'dark' ? 'light' : 'dark',
        );

        document.dispatchEvent(
            new CustomEvent('theme-changed', {
                detail: currentTheme === 'dark' ? 'light' : 'dark',
            }),
        );
    });

    const handleClick = $(() => {
        theme.value = theme.value === 'dark' ? 'light' : 'dark';
    });

    console.log('theme', theme.value);

    return (
        <button
            onClick$={handleClick}
            class="h-8 w-8 rounded-full border-2 border-transparent p-1 hover:border-maldives xl:h-12 xl:w-12 xl:p-2"
            aria-label="Toggle dark mode"
        >
            <Icon />
        </button>
    );
});
