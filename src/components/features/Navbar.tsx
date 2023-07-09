import type { Component } from 'solid-js';
import { PAGE_TITLE } from '~/utils/constants';

export const Navbar: Component = () => (
    <nav
        class="flex h-14 items-center justify-between rounded-full border-2 border-solid xl:h-20  bg-white relative"
        aria-label="Global navigation"
    >
        <a class="absolute left-6 lg:left-8 text-accent text-3xl xl:text-[40px]" href="/">
            <h1>{PAGE_TITLE}</h1>
        </a>
        {/* <a href="/rss.xml">
            <OcRss2
                size={28}
                class="sm:mr-6 invert-[.40] sm:h-7 xs:h-5 mr-3 h-4 xs:mr-4"
                aria-label="RSS"
            />
        </a> */}
    </nav>
);
