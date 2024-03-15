import { $, component$, useOnDocument, useSignal } from '@builder.io/qwik';
import { SunnyIcon } from './icon/sunny-icon';
import { MoonIcon } from './icon/moon-icon';
import type { Theme } from './client-script';

export const Icon = component$(() => {
    const theme = useSignal<Theme>();

    useOnDocument(
        'theme-changed',
        $((e: CustomEvent<Theme>) => {
            console.log('theme', e);
            theme.value = e.detail;
        }),
    );

    // useVisibleTask$(() => {
    //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //     // @ts-expect-error
    //     document.addEventListener('theme-changed', (e: CustomEvent<Theme>) => {
    //         theme.value = e.detail;
    //     });
    // });

    console.log('theme', theme.value);

    return theme.value === 'dark' ? <MoonIcon /> : <SunnyIcon />;
});
