import { Icon } from '@iconify-icon/solid';
import { HoverCard } from '@kobalte/core';
import clsx from 'clsx';
import { CgDarkMode, CgMoreAlt } from 'solid-icons/cg';
import { FiRss } from 'solid-icons/fi';
import { createSignal, onCleanup, onMount } from 'solid-js';
import { toggleTheme } from './client-script';

const baseIconClasses =
    'bg-white rounded-full border-2 border-transparent p-2 dark:bg-black-knight dark:text-santas-gray';
const animationIconClasses =
    'hover-element dark:hover:bg-gray-500 hover:scale-[120%]';

const Memu = () => {
    const [open, setOpen] = createSignal(false);

    const [windowWidth, setWindowWidth] = createSignal(window.innerWidth);
    onMount(() => {
        window.addEventListener('resize', () =>
            setWindowWidth(window.innerWidth),
        );
    });
    onCleanup(() => {
        window.removeEventListener('resize', () =>
            setWindowWidth(window.innerWidth),
        );
    });

    return (
        <HoverCard.Root
            openDelay={0}
            closeDelay={0}
            open={open()}
            onOpenChange={setOpen}
            placement={windowWidth() >= 768 ? 'bottom' : 'right'} // lg
            gutter={12}
        >
            <HoverCard.Trigger onClick={() => setOpen((prev) => !prev)}>
                <button
                    type="button"
                    class={baseIconClasses}
                    aria-label="global menu"
                >
                    <CgMoreAlt class="text-xl" />
                </button>
            </HoverCard.Trigger>
            <HoverCard.Portal>
                <HoverCard.Content class="flex gap-3 md:flex-col">
                    <button
                        type="button"
                        class={clsx(baseIconClasses, animationIconClasses)}
                        aria-label="Toggle dark mode"
                        onClick={() => toggleTheme()}
                    >
                        <CgDarkMode class="text-xl" />
                    </button>
                    <a
                        href="/rss.xml"
                        class={clsx(baseIconClasses, animationIconClasses)}
                        aria-label="RSS feed"
                    >
                        <FiRss class="text-xl" />
                    </a>
                    <a
                        href="https://twitter.com/t5ukiyo"
                        class={clsx(
                            baseIconClasses,
                            animationIconClasses,
                            'pb-1',
                        )}
                    >
                        <Icon icon="line-md:twitter-x" class="text-xl" />
                    </a>
                    <a
                        href="https://github.com/s3igo"
                        class={clsx(
                            baseIconClasses,
                            animationIconClasses,
                            'pb-1',
                        )}
                    >
                        <Icon icon="line-md:github" class="text-xl" />
                    </a>
                </HoverCard.Content>
            </HoverCard.Portal>
        </HoverCard.Root>
    );
};

export default Memu;
