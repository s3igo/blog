import { Button } from '@kobalte/core';
import type { Component } from 'solid-js';

const DarkModeIcon: Component = () => (
    <svg
        fill="none"
        stroke-width="0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        height="100%"
        width="100%"
        style="overflow: visible;"
    >
        <path fill="currentColor" d="M12 16a4 4 0 0 0 0-8v8Z"></path>
        <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm0 2v4a4 4 0 1 0 0 8v4a8 8 0 1 0 0-16Z"
            clip-rule="evenodd"
        ></path>
    </svg>
);

/** @package */
export const ThemeButton: Component = () => {
    const toggleTheme = (): void => {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            window.localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            window.localStorage.setItem('theme', 'dark');
        }
    };

    return (
        <Button.Root
            onClick={toggleTheme}
            class="border-2 border-transparent rounded-full hover:border-maldives p-1 xl:p-2 xl:h-12 xl:w-12 h-8 w-8"
        >
            <DarkModeIcon />
        </Button.Root>
    );
};
