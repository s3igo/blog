import type { Component } from 'solid-js';
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

export const Navbar: Component = () => (
    <nav
        class="flex h-14 items-center justify-between rounded-full border-2 border-solid xl:h-20  bg-white relative"
        aria-label="Global navigation"
    >
        <a class="absolute left-6 lg:left-8 text-accent text-3xl xl:text-[40px]" href="/">
            <h1>{PAGE_TITLE}</h1>
        </a>
        <a
            href="/rss.xml"
            aria-label="RSS"
            class="absolute xl:h-12 xl:w-12 h-8 w-8 right-3 xl:right-4 border-2 border-transparent rounded-full hover:border-cyan-500 p-1 xl:p-2"
        >
            <RssIcon />
        </a>
    </nav>
);
