import { component$, useSignal } from '@builder.io/qwik';

export const MoonIcon = component$(() => {
    const animateRef = useSignal<SVGAnimateElement>();
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            onMouseEnter$={() => animateRef.value?.beginElement()}
        >
            <animate
                id="moon-filled-entrypoint"
                begin="indefinite"
                ref={animateRef}
            />
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
                        begin="moon-filled-entrypoint.begin+0.525s"
                        dur="0.3s"
                        values="4;0"
                    />
                    <animate
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        begin="lineMdMoonRisingFilledAltLoop0.begin+1.5s;lineMdMoonRisingFilledAltLoop0.begin+3s"
                        dur="0.3s"
                        values="4;0"
                    />
                    <animate
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        begin="lineMdMoonRisingFilledAltLoop0.begin+0.9s;lineMdMoonRisingFilledAltLoop0.begin+2.4s;lineMdMoonRisingFilledAltLoop0.begin+3.9s"
                        dur="0.3s"
                        values="0;4"
                    />
                    <set
                        attributeName="d"
                        begin="lineMdMoonRisingFilledAltLoop0.begin+1.35s"
                        to="M12 5h1.5M12 5h-1.5M12 5v1.5M12 5v-1.5"
                    />
                    <set
                        attributeName="d"
                        begin="lineMdMoonRisingFilledAltLoop0.begin+2.85s"
                        to="M12 4h1.5M12 4h-1.5M12 4v1.5M12 4v-1.5"
                    />
                    <set
                        attributeName="d"
                        begin="lineMdMoonRisingFilledAltLoop0.begin+4.35s"
                        to="M13 4h1.5M13 4h-1.5M13 4v1.5M13 4v-1.5"
                    />
                </path>
                <path d="M19 11h1.5M19 11h-1.5M19 11v1.5M19 11v-1.5">
                    <animate
                        id="lineMdMoonRisingFilledAltLoop1"
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        begin="moon-filled-entrypoint.begin+0.825s"
                        dur="0.3s"
                        values="4;0"
                    />
                    <animate
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        begin="lineMdMoonRisingFilledAltLoop1.begin+1.5s;lineMdMoonRisingFilledAltLoop1.begin+3s"
                        dur="0.3s"
                        values="4;0"
                    />
                    <animate
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        begin="lineMdMoonRisingFilledAltLoop1.begin+0.9s;lineMdMoonRisingFilledAltLoop1.begin+2.4s;lineMdMoonRisingFilledAltLoop1.begin+3.9s"
                        dur="0.3s"
                        values="0;4"
                    />
                    <set
                        attributeName="d"
                        begin="lineMdMoonRisingFilledAltLoop1.begin+1.35s"
                        to="M17 11h1.5M17 11h-1.5M17 11v1.5M17 11v-1.5"
                    />
                    <set
                        attributeName="d"
                        begin="lineMdMoonRisingFilledAltLoop1.begin+2.85s"
                        to="M18 12h1.5M18 12h-1.5M18 12v1.5M18 12v-1.5"
                    />
                    <set
                        attributeName="d"
                        begin="lineMdMoonRisingFilledAltLoop1.begin+4.35s"
                        to="M19 11h1.5M19 11h-1.5M19 11v1.5M19 11v-1.5"
                    />
                </path>
                <path d="M19 4h1.5M19 4h-1.5M19 4v1.5M19 4v-1.5">
                    <animate
                        id="lineMdMoonRisingFilledAltLoop2"
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        begin="moon-filled-entrypoint.begin+2.175s"
                        dur="0.3s"
                        values="4;0"
                    />
                    <animate
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        begin="lineMdMoonRisingFilledAltLoop2.begin+1.5s"
                        dur="0.3s"
                        values="4;0"
                    />
                    <animate
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        begin="lineMdMoonRisingFilledAltLoop2.begin+0.9s;lineMdMoonRisingFilledAltLoop2.begin+2.4s"
                        dur="0.3s"
                        values="0;4"
                    />
                    <set
                        attributeName="d"
                        begin="lineMdMoonRisingFilledAltLoop2.begin+1.35s"
                        to="M20 5h1.5M20 5h-1.5M20 5v1.5M20 5v-1.5"
                    />
                    <set
                        attributeName="d"
                        begin="lineMdMoonRisingFilledAltLoop2.begin+4.35s"
                        to="M19 4h1.5M19 4h-1.5M19 4v1.5M19 4v-1.5"
                    />
                </path>
            </g>
            <path
                fill="currentColor"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 6 C7 12.08 11.92 17 18 17 C18.53 17 19.05 16.96 19.56 16.89 C17.95 19.36 15.17 21 12 21 C7.03 21 3 16.97 3 12 C3 8.83 4.64 6.05 7.11 4.44 C7.04 4.95 7 5.47 7 6 Z"
            />
        </svg>
    );
});
