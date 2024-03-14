import { component$ } from '@builder.io/qwik';

export const MoonIcon = component$(() => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            id="moonIcon"
        >
            <animate
                id="lineMdMoonRisingFilledAlt"
                begin="moonIcon.click"
            ></animate>
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
});
