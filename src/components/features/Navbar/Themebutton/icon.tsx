import { $, component$, useOnDocument, useSignal } from '@builder.io/qwik';

export const Icon = component$(() => {
    const theme = useSignal<'light' | 'dark'>();

    useOnDocument(
        'theme',
        $((e: CustomEvent<'light' | 'dark'>) => {
            theme.value = e.detail;
        }),
    );

    return theme.value === 'light' ? <SunnyIcon /> : <MoonIcon />;
});

function SunnyIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
        >
            <g stroke="currentColor" stroke-linecap="round" stroke-width="2">
                <path
                    fill="currentColor"
                    fill-opacity="0"
                    stroke-dasharray="34"
                    stroke-dashoffset="34"
                    d="M12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7"
                >
                    <animate
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        dur="0.2s"
                        values="34;0"
                    />
                    <animate
                        fill="freeze"
                        attributeName="fill-opacity"
                        begin="0.45s"
                        dur="0.25s"
                        values="0;1"
                    />
                </path>
                <g fill="none" stroke-dasharray="2" stroke-dashoffset="2">
                    <path d="M0 0">
                        <animate
                            fill="freeze"
                            attributeName="d"
                            begin="0.25s"
                            dur="0.1s"
                            values="M12 19v1M19 12h1M12 5v-1M5 12h-1;M12 21v1M21 12h1M12 3v-1M3 12h-1"
                        />
                        <animate
                            fill="freeze"
                            attributeName="stroke-dashoffset"
                            begin="0.25s"
                            dur="0.1s"
                            values="2;0"
                        />
                    </path>
                    <path d="M0 0">
                        <animate
                            fill="freeze"
                            attributeName="d"
                            begin="0.35s"
                            dur="0.1s"
                            values="M17 17l0.5 0.5M17 7l0.5 -0.5M7 7l-0.5 -0.5M7 17l-0.5 0.5;M18.5 18.5l0.5 0.5M18.5 5.5l0.5 -0.5M5.5 5.5l-0.5 -0.5M5.5 18.5l-0.5 0.5"
                        />
                        <animate
                            fill="freeze"
                            attributeName="stroke-dashoffset"
                            begin="0.35s"
                            dur="0.1s"
                            values="2;0"
                        />
                    </path>
                </g>
            </g>
        </svg>
    );
}

function MoonIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
        >
            <animate id="lineMdMoonRisingFilledAlt"></animate>
            <g
                fill="none"
                stroke="currentColor"
                stroke-dasharray="4"
                stroke-dashoffset="4"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <path d="M13 4h1.5M13 4h-1.5M13 4v1.5M13 4v-1.5">
                    <animate
                        id="lineMdMoonRisingFilledAltLoop0"
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        begin="lineMdMoonRisingFilledAlt.begin+0.7s"
                        dur="0.4s"
                        values="4;0"
                    ></animate>
                    <animate
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        begin="lineMdMoonRisingFilledAltLoop0.begin+2s;lineMdMoonRisingFilledAltLoop0.begin+4s"
                        dur="0.4s"
                        values="4;0"
                    ></animate>
                    <animate
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        begin="lineMdMoonRisingFilledAltLoop0.begin+1.2s;lineMdMoonRisingFilledAltLoop0.begin+3.2s;lineMdMoonRisingFilledAltLoop0.begin+5.2s"
                        dur="0.4s"
                        values="0;4"
                    ></animate>
                    <set
                        attributeName="d"
                        begin="lineMdMoonRisingFilledAltLoop0.begin+1.8s"
                        to="M12 5h1.5M12 5h-1.5M12 5v1.5M12 5v-1.5"
                    ></set>
                    <set
                        attributeName="d"
                        begin="lineMdMoonRisingFilledAltLoop0.begin+3.8s"
                        to="M12 4h1.5M12 4h-1.5M12 4v1.5M12 4v-1.5"
                    ></set>
                    <set
                        attributeName="d"
                        begin="lineMdMoonRisingFilledAltLoop0.begin+5.8s"
                        to="M13 4h1.5M13 4h-1.5M13 4v1.5M13 4v-1.5"
                    ></set>
                </path>
                <path d="M19 11h1.5M19 11h-1.5M19 11v1.5M19 11v-1.5">
                    <animate
                        id="lineMdMoonRisingFilledAltLoop1"
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        begin="lineMdMoonRisingFilledAlt.begin+1.1s"
                        dur="0.4s"
                        values="4;0"
                    ></animate>
                    <animate
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        begin="lineMdMoonRisingFilledAltLoop1.begin+2s;lineMdMoonRisingFilledAltLoop1.begin+4s"
                        dur="0.4s"
                        values="4;0"
                    ></animate>
                    <animate
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        begin="lineMdMoonRisingFilledAltLoop1.begin+1.2s;lineMdMoonRisingFilledAltLoop1.begin+3.2s;lineMdMoonRisingFilledAltLoop1.begin+5.2s"
                        dur="0.4s"
                        values="0;4"
                    ></animate>
                    <set
                        attributeName="d"
                        begin="lineMdMoonRisingFilledAltLoop1.begin+1.8s"
                        to="M17 11h1.5M17 11h-1.5M17 11v1.5M17 11v-1.5"
                    ></set>
                    <set
                        attributeName="d"
                        begin="lineMdMoonRisingFilledAltLoop1.begin+3.8s"
                        to="M18 12h1.5M18 12h-1.5M18 12v1.5M18 12v-1.5"
                    ></set>
                    <set
                        attributeName="d"
                        begin="lineMdMoonRisingFilledAltLoop1.begin+5.8s"
                        to="M19 11h1.5M19 11h-1.5M19 11v1.5M19 11v-1.5"
                    ></set>
                </path>
                <path d="M19 4h1.5M19 4h-1.5M19 4v1.5M19 4v-1.5">
                    <animate
                        id="lineMdMoonRisingFilledAltLoop2"
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        begin="lineMdMoonRisingFilledAlt.begin+2.9s"
                        dur="0.4s"
                        values="4;0"
                    ></animate>
                    <animate
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        begin="lineMdMoonRisingFilledAltLoop2.begin+2s"
                        dur="0.4s"
                        values="4;0"
                    ></animate>
                    <animate
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        begin="lineMdMoonRisingFilledAltLoop2.begin+1.2s;lineMdMoonRisingFilledAltLoop2.begin+3.2s"
                        dur="0.4s"
                        values="0;4"
                    ></animate>
                    <set
                        attributeName="d"
                        begin="lineMdMoonRisingFilledAltLoop2.begin+1.8s"
                        to="M20 5h1.5M20 5h-1.5M20 5v1.5M20 5v-1.5"
                    ></set>
                    <set
                        attributeName="d"
                        begin="lineMdMoonRisingFilledAltLoop2.begin+5.8s"
                        to="M19 4h1.5M19 4h-1.5M19 4v1.5M19 4v-1.5"
                    ></set>
                </path>
            </g>
            <path
                fill="currentColor"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 6 C7 12.08 11.92 17 18 17 C18.53 17 19.05 16.96 19.56 16.89 C17.95 19.36 15.17 21 12 21 C7.03 21 3 16.97 3 12 C3 8.83 4.64 6.05 7.11 4.44 C7.04 4.95 7 5.47 7 6 Z"
            ></path>
        </svg>
    );
}
