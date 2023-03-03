import { OcRss2 } from 'solid-icons/oc';
import type { Component } from 'solid-js';
import { PAGE_TITLE } from '~/constants';

export type Props = { isH1: boolean };
export const Navbar: Component<Props> = ({ isH1 }) => (
    <nav class="custom-shadow flex h-14 items-center justify-between rounded-full border-2 border-solid border-primary bg-background xs:h-16 sm:h-20">
        <a class="pl-5 text-2xl text-primary xs:pl-6 xs:text-3xl sm:pl-8 sm:text-[40px]" href="/">
            {isH1 ? <h1>{PAGE_TITLE}</h1> : PAGE_TITLE}
        </a>
        <a href="/rss.xml">
            <OcRss2
                size={28}
                class="sm:mr-6 invert-[.40] sm:h-7 xs:h-5 mr-3 h-4 xs:mr-4"
                aria-label="RSS"
            />
        </a>
    </nav>
);