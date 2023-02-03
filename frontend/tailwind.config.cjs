module.exports = {
    content: ["./src/**/*.{astro,html,js,jsx,ts,tsx}"],
    theme: {
        colors: {
            primary: "#011627",
            secondary: "#FFEB95",
            // background: "#2F2F2F", // 背景色検討中
            background: "#383838",
            foreground: "#D6DEEB",
            shadow: "#575656",
        },
        fontFamily: {
            sans: ["Nunito Sans", "Zen Kaku Gothic New", "system-ui", "sans-serif"],
            // code: ["Zen Kaku Gothic New", "sans-serif"],
        },
    },
    plugins: [require("@tailwindcss/line-clamp")],
};
