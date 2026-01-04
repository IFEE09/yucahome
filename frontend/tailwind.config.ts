import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Renombramos para uso semántico en tu app
                background: "#fafaf9", // stone-50
                surface: "#ffffff",    // white
                primary: "#4f46e5",    // indigo-600
                secondary: "#f97316",  // orange-500
                textMain: "#1c1917",   // stone-900
                textMuted: "#78716c",  // stone-500
            },
        },
    },
    plugins: [],
};
export default config;
