import { HoverCard } from '@kobalte/core';
import clsx from 'clsx';
import { createSignal, onCleanup, onMount } from 'solid-js';
import {
    Github,
    MenuIcon,
    Moon,
    Rss,
    Sunny,
    TwitterX,
} from '~/components/icons/line-md';
import { getCurrentTheme, toggleTheme } from './client-script';

const baseIconClasses =
    'bg-white rounded-full border-2 border-transparent p-2 dark:bg-black-knight dark:text-santas-gray';
const animationIconClasses =
    'hover-element dark:hover:bg-gray-500 hover:scale-[120%]';
const portalIconClasses = clsx(baseIconClasses, animationIconClasses);

const Memu = () => {
    const [open, setOpen] = createSignal(false);
    const [darkMode, setDarkMode] = createSignal(false);
    const [windowWidth, setWindowWidth] = createSignal<number>();

    onMount(() => {
        setDarkMode(getCurrentTheme() === 'dark');

        setWindowWidth(window.innerWidth);
        window.addEventListener('resize', () =>
            setWindowWidth(window.innerWidth),
        );
    });

    onCleanup(() => {
        window.removeEventListener('resize', () =>
            setWindowWidth(window.innerWidth),
        );
    });

    const decidePlacement = (): 'bottom' | 'right' => {
        const width = windowWidth();

        if (width === undefined) {
            return 'bottom';
        }

        // md = min-width: 768px
        return width >= 768 ? 'bottom' : 'right';
    };

    const handleToggleTheme = () => {
        setDarkMode((prev) => !prev);
        toggleTheme();
    };

    return (
        <HoverCard.Root
            openDelay={0}
            closeDelay={0}
            open={open()}
            onOpenChange={setOpen}
            gutter={12}
            placement={decidePlacement()}
        >
            <HoverCard.Trigger
                as="button"
                type="button"
                class={baseIconClasses}
                aria-label="global menu"
                onClick={() => setOpen((prev) => !prev)}
            >
                <MenuIcon class="text-xl" />
            </HoverCard.Trigger>
            <HoverCard.Portal>
                <HoverCard.Content class="flex gap-3 text-xl md:flex-col">
                    <button
                        type="button"
                        class={portalIconClasses}
                        aria-label="Toggle dark mode"
                        onClick={handleToggleTheme}
                    >
                        {darkMode() ? <Sunny /> : <Moon />}
                    </button>
                    <a
                        href="/rss.xml"
                        class={portalIconClasses}
                        aria-label="RSS feed"
                    >
                        <Rss />
                    </a>
                    <a
                        href="https://twitter.com/t5ukiyo"
                        class={portalIconClasses}
                    >
                        <TwitterX />
                    </a>
                    <a
                        href="https://github.com/s3igo"
                        class={portalIconClasses}
                    >
                        <Github />
                    </a>
                </HoverCard.Content>
            </HoverCard.Portal>
        </HoverCard.Root>
    );
};

export default Memu;
