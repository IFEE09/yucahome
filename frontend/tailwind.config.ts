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
                // Paleta natural yucateca
                background: "#fafaf9", // Stone 50 - Piedra caliza
                surface: "#ffffff",    // White - Tarjetas limpias
                primary: "#15803d",    // Green 700 - Verde bosque
                secondary: "#5D4037",  // Café árbol nogal - Acentos
                textMain: "#1c1917",   // Stone 900 - Texto principal
                textMuted: "#57534e",  // Stone 600 - Texto secundario
            },
        },
    },
    plugins: [],
};
export default config;
