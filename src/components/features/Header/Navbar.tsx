import { type Component, Show } from 'solid-js';
import { PAGE_TITLE } from '~/utils/constants';

export type Props = { isH1: boolean };

export const Navbar: Component<Props> = (props) => (
    // <nav
    //     class="flex h-14 items-center justify-between rounded-full border-2 border-solid border-primary xs:h-16 sm:h-20 bg-gradient-to-tr from-background via-accent via-55%"
    //     aria-label="Global navigation"
    // >
    <nav
        class="flex h-14 items-center justify-between rounded-full border-2 border-solid xs:h-16 xl:h-20  bg-white relative"
        aria-label="Global navigation"
    >
        <a
            class="absolute left-6 lg:left-8 text-2xl text-accent xs:text-3xl xl:text-[40px]"
            href="/"
        >
            <Show when={props.isH1} fallback={PAGE_TITLE}>
                <h1>{PAGE_TITLE}</h1>
            </Show>
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
