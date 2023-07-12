import { As, Button } from '@kobalte/core';
import { type Component, createSignal } from 'solid-js';
import { PAGE_TITLE } from '~/utils/constants';

const RssIcon: Component = () => (
    <svg
        fill="currentColor"
        stroke-width="0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        height="100%"
        width="100%"
        style="overflow: visible;"
    >
        <path d="M2.002 2.725a.75.75 0 0 1 .797-.699C8.79 2.42 13.58 7.21 13.974 13.201a.75.75 0 0 1-1.497.098 10.502 10.502 0 0 0-9.776-9.776.747.747 0 0 1-.7-.798ZM2.84 7.05h-.002a7.002 7.002 0 0 1 6.113 6.111.75.75 0 0 1-1.49.178 5.503 5.503 0 0 0-4.8-4.8.75.75 0 0 1 .179-1.489ZM2 13a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"></path>
    </svg>
);

const DarkModeIcon: Component = () => (
    <svg
        fill="none"
        stroke-width="0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        height="1em"
        width="1em"
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

export const Navbar: Component = () => {
    const getCurrentTheme = (): 'light' | 'dark' => {
        if (typeof window.localStorage.getItem('theme') === 'string') {
            const current = window.localStorage.getItem('theme');
            return current === 'dark' ? 'dark' : 'light';
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        } else {
            return 'light';
        }
    };

    const [darkMode, setDarkMode] = createSignal(getCurrentTheme() === 'dark' ? true : false);

    const toggleTheme = (): void => {
        if (darkMode()) {
            document.documentElement.classList.remove('dark');
            window.localStorage.setItem('theme', 'light');
            setDarkMode(false);
        } else {
            document.documentElement.classList.add('dark');
            window.localStorage.setItem('theme', 'dark');
            setDarkMode(true);
        }
    };

    return (
        <nav
            class="flex h-14 items-center justify-between rounded-full border-2 border-solid xl:h-20  bg-white relative"
            aria-label="Global navigation"
        >
            <a class="absolute left-6 lg:left-8 text-accent text-3xl xl:text-[40px]" href="/">
                <h1>{PAGE_TITLE}</h1>
            </a>
            <Button.Root asChild>
                <As
                    component="a"
                    href="/rss.xml"
                    class="absolute xl:h-12 xl:w-12 h-8 w-8 right-3 xl:right-4 border-2 border-transparent rounded-full hover:border-cyan-500 p-1 xl:p-2"
                >
                    <RssIcon />
                </As>
            </Button.Root>
            <Button.Root onClick={toggleTheme}>
                <DarkModeIcon />
            </Button.Root>
        </nav>
    );
};
