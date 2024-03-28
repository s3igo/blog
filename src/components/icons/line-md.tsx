/*
Copyright 2020 Vjacheslav Trushkin

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

import { type JSX, splitProps } from 'solid-js';

type Attributes = JSX.SVGElementTags['svg'];

type Props = Attributes & { title?: string };

export const Sunny = (props: Props) => {
    const [explicit, attrs] = splitProps(props, ['title']);
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            {...attrs}
        >
            <title>{explicit.title}</title>
            <g
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-width="2"
            >
                <path
                    stroke-dasharray="34"
                    stroke-dashoffset="34"
                    d="M12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7"
                >
                    <animate
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        dur="0.3s"
                        values="34;0"
                    />
                </path>
                <g stroke-dasharray="2" stroke-dashoffset="2">
                    <path d="M0 0">
                        <animate
                            fill="freeze"
                            attributeName="d"
                            begin="0.375s"
                            dur="0.15s"
                            values="M12 19v1M19 12h1M12 5v-1M5 12h-1;M12 21v1M21 12h1M12 3v-1M3 12h-1"
                        />
                        <animate
                            fill="freeze"
                            attributeName="stroke-dashoffset"
                            begin="0.375s"
                            dur="0.15s"
                            values="2;0"
                        />
                    </path>
                    <path d="M0 0">
                        <animate
                            fill="freeze"
                            attributeName="d"
                            begin="0.525s"
                            dur="0.15s"
                            values="M17 17l0.5 0.5M17 7l0.5 -0.5M7 7l-0.5 -0.5M7 17l-0.5 0.5;M18.5 18.5l0.5 0.5M18.5 5.5l0.5 -0.5M5.5 5.5l-0.5 -0.5M5.5 18.5l-0.5 0.5"
                        />
                        <animate
                            fill="freeze"
                            attributeName="stroke-dashoffset"
                            begin="0.525s"
                            dur="0.15s"
                            values="2;0"
                        />
                    </path>
                </g>
            </g>
        </svg>
    );
};

export const Moon = (props: Props) => {
    const [explicit, attrs] = splitProps(props, ['title']);
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            {...attrs}
        >
            <title>{explicit.title}</title>
            <path
                fill="none"
                stroke="currentColor"
                stroke-dasharray="64"
                stroke-dashoffset="64"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 3C7.03 3 3 7.03 3 12C3 16.97 7.03 21 12 21C15.53 21 18.59 18.96 20.06 16C20.06 16 14 17.5 11 13C8 8.5 12 3 12 3Z"
            >
                <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    dur="0.45s"
                    values="64;0"
                />
            </path>
        </svg>
    );
};

export const TwitterX = (props: Props) => {
    const [explicit, attrs] = splitProps(props, ['title']);
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            {...attrs}
        >
            <title>{explicit.title}</title>
            <g fill="currentColor">
                <path d="M1 2h2.5L3.5 2h-2.5z">
                    <animate
                        fill="freeze"
                        attributeName="d"
                        dur="0.3s"
                        values="M1 2h2.5L3.5 2h-2.5z;M1 2h2.5L18.5 22h-2.5z"
                    />
                </path>
                <path d="M5.5 2h2.5L7.2 2h-2.5z">
                    <animate
                        fill="freeze"
                        attributeName="d"
                        dur="0.3s"
                        values="M5.5 2h2.5L7.2 2h-2.5z;M5.5 2h2.5L23 22h-2.5z"
                    />
                </path>
                <path d="M3 2h5v0h-5z" opacity="0">
                    {/* @ts-ignore */}
                    <set attributeName="opacity" begin="0.3s" to="1" />
                    <animate
                        fill="freeze"
                        attributeName="d"
                        begin="0.3s"
                        dur="0.3s"
                        values="M3 2h5v0h-5z;M3 2h5v2h-5z"
                    />
                </path>
                <path d="M16 22h5v0h-5z" opacity="0">
                    {/* @ts-ignore */}
                    <set attributeName="opacity" begin="0.3s" to="1" />
                    <animate
                        fill="freeze"
                        attributeName="d"
                        begin="0.3s"
                        dur="0.3s"
                        values="M16 22h5v0h-5z;M16 22h5v-2h-5z"
                    />
                </path>
                <path d="M18.5 2h3.5L22 2h-3.5z" opacity="0">
                    {/* @ts-ignore */}
                    <set attributeName="opacity" begin="0.375s" to="1" />
                    <animate
                        fill="freeze"
                        attributeName="d"
                        begin="0.375s"
                        dur="0.3s"
                        values="M18.5 2h3.5L22 2h-3.5z;M18.5 2h3.5L5 22h-3.5z"
                    />
                </path>
            </g>
        </svg>
    );
};

export const Rss = (props: Props) => {
    const [explicit, attrs] = splitProps(props, ['title']);
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            {...attrs}
        >
            <title>{explicit.title}</title>
            <g
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
            >
                <path
                    stroke-dasharray="16"
                    stroke-dashoffset="16"
                    d="M4 11C6.39 11 8.68 11.95 10.36 13.64C12.05 15.32 13 17.61 13 20"
                    opacity="0"
                >
                    {/* @ts-ignore */}
                    <set attributeName="opacity" begin="0.225s" to="1" />
                    <animate
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        begin="0.225s"
                        dur="0.225s"
                        values="16;0"
                    />
                </path>
                <path
                    stroke-dasharray="28"
                    stroke-dashoffset="28"
                    d="M4 4C8.24 4 12.31 5.69 15.31 8.69C18.31 11.69 20 15.76 20 20"
                    opacity="0"
                >
                    {/* @ts-ignore */}
                    <set attributeName="opacity" begin="0.525s" to="1" />
                    <animate
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        begin="0.525s"
                        dur="0.3s"
                        values="28;0"
                    />
                </path>
            </g>
            <circle cx="5" cy="19" r="2" fill="currentColor" fill-opacity="0">
                <animate
                    fill="freeze"
                    attributeName="fill-opacity"
                    dur="0.15s"
                    values="0;1"
                />
            </circle>
        </svg>
    );
};

export const Github = (props: Props) => {
    const [explicit, attrs] = splitProps(props, ['title']);

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            {...attrs}
        >
            <title>{explicit.title}</title>
            <g
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
            >
                <path
                    stroke-dasharray="30"
                    stroke-dashoffset="30"
                    d="M12 4C13.6683 4 14.6122 4.39991 15 4.5C15.5255 4.07463 16.9375 3 18.5 3C18.8438 4 18.7863 5.21921 18.5 6C19.25 7 19.5 8 19.5 9.5C19.5 11.6875 19.017 13.0822 18 14C16.983 14.9178 15.8887 15.3749 14.5 15.5C15.1506 16.038 15 17.3743 15 18C15 18.7256 15 21 15 21M12 4C10.3317 4 9.38784 4.39991 9 4.5C8.47455 4.07463 7.0625 3 5.5 3C5.15625 4 5.21371 5.21921 5.5 6C4.75 7 4.5 8 4.5 9.5C4.5 11.6875 4.98301 13.0822 6 14C7.01699 14.9178 8.1113 15.3749 9.5 15.5C8.84944 16.038 9 17.3743 9 18C9 18.7256 9 21 9 21"
                >
                    <animate
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        dur="0.45s"
                        values="30;0"
                    />
                </path>
                <path
                    stroke-dasharray="10"
                    stroke-dashoffset="10"
                    d="M9 19C7.59375 19 6.15625 18.4375 5.3125 17.8125C4.46875 17.1875 4.21875 16.1562 3 15.5"
                >
                    <animate
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        begin="0.525s"
                        dur="0.15s"
                        values="10;0"
                    />
                </path>
            </g>
        </svg>
    );
};
