import { $, component$, useOnDocument, useSignal } from '@builder.io/qwik';
import { MoonIcon } from './moon-icon';
import { SunnyIcon } from './sunny-icon';

export const Icon = component$(() => {
    // 'astro:page-load'イベントで必ず`theme`イベントをdispatchするので、
    // 初期値はいらない
    const theme = useSignal<'light' | 'dark'>();

    useOnDocument(
        'theme',
        $((e: CustomEvent<'light' | 'dark'>) => {
            theme.value = e.detail;
        }),
    );

    return theme.value === 'light' ? <SunnyIcon /> : <MoonIcon />;
});
