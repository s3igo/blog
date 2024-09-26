import clsx from 'clsx';
import {
    type Component,
    type ComponentProps,
    type JSX,
    Show,
    splitProps,
} from 'solid-js';
import { Dynamic } from 'solid-js/web';

// biome-ignore lint/suspicious/noExplicitAny: any is used to allow for any element type
type Element = 'div' | 'a' | Component<Record<string, any>>;

type Props<T extends Element> = ComponentProps<T> & {
    as?: T;
    icon?: JSX.Element;
    children: string;
};

export const Metadata = <T extends Element = 'div'>(props: Props<T>) => {
    const [local, others] = splitProps(props, ['as', 'icon', 'children']);
    const component = local.as ?? 'div';

    return (
        <Dynamic
            class={clsx(
                'font-code text-rainmaker max-xl:text-sm dark:text-blue-blouse',
                local.icon && 'flex items-center',
                component === 'a' &&
                    'hover-element w-max rounded-full border-2 border-transparent bg-white px-3 py-1 dark:bg-black-knight',
            )}
            {...{ component }}
            {...others}
        >
            <Show when={local.icon} fallback={local.children}>
                {local.icon}
                <div>{local.children}</div>
            </Show>
        </Dynamic>
    );
};
