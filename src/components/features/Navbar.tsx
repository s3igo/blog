import type { Component } from 'solid-js';
import { PAGE_TITLE } from '~/utils/constants';
import { RssButton } from './Navbar/RssButton';
import { ThemeButton } from './Navbar/ThemeButton';

export const Navbar: Component = () => {
    return (
        <nav
            class="flex h-14 items-center justify-between rounded-full border-2 border-solid xl:h-20  bg-white relative"
            aria-label="Global navigation"
        >
            <a class="absolute left-6 lg:left-8 text-accent text-3xl xl:text-[40px]" href="/">
                <h1>{PAGE_TITLE}</h1>
            </a>
            <div class="flex absolute right-3 xl:right-4 ">
                <RssButton />
                <ThemeButton />
            </div>
        </nav>
    );
};
