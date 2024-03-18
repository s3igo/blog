import { HoverCard } from '@kobalte/core';
import clsx from 'clsx';
import { CgDarkMode, CgMoreAlt } from 'solid-icons/cg';
import { FiRss } from 'solid-icons/fi';
import { createSignal } from 'solid-js';
import { toggleTheme } from './client-script';

const baseIconClasses =
    'bg-white rounded-full border-2 border-transparent p-2 dark:bg-yamagami-blue';
const animationIconClasses =
    'hover-element dark:hover:bg-gray-500 hover:scale-[120%]';

const Memu = () => {
    const [open, setOpen] = createSignal(false);
    return (
        <HoverCard.Root
            openDelay={0}
            closeDelay={0}
            open={open()}
            onOpenChange={setOpen}
        >
            <HoverCard.Trigger onClick={() => setOpen((prev) => !prev)}>
                <button type="button" class={clsx(baseIconClasses)}>
                    <CgMoreAlt class="text-xl" />
                </button>
            </HoverCard.Trigger>
            <HoverCard.Portal>
                <HoverCard.Content class="flex gap-3 pt-3 md:flex-col">
                    <a
                        href="/rss.xml"
                        class={clsx(baseIconClasses, animationIconClasses)}
                        aria-label="RSS feed"
                    >
                        <FiRss class="text-xl" />
                    </a>
                    <button
                        type="button"
                        class={clsx(baseIconClasses, animationIconClasses)}
                        aria-label="Toggle dark mode"
                        onClick={() => toggleTheme()}
                    >
                        <CgDarkMode class="text-xl" />
                    </button>
                </HoverCard.Content>
            </HoverCard.Portal>
        </HoverCard.Root>
    );
};

export default Memu;
