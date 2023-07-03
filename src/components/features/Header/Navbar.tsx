import { OcRss2 } from 'solid-icons/oc';
import { type Component, Show } from 'solid-js';
import { PAGE_TITLE } from '~/constants';

/** @package */
export type Props = { isH1: boolean };

/** @package */
export const Navbar: Component<Props> = (props) => (
    <nav
        class="custom-shadow flex h-14 items-center justify-between rounded-full border-2 border-solid border-primary bg-background xs:h-16 sm:h-20"
        aria-label="Global navigation"
    >
        <a class="pl-5 text-2xl text-primary xs:pl-6 xs:text-3xl sm:pl-8 sm:text-[40px]" href="/">
            <Show when={props.isH1} fallback={PAGE_TITLE}>
                <h1>{PAGE_TITLE}</h1>
            </Show>
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
