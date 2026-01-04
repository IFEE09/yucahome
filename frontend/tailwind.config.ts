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
                // --- Paleta "Bosque Nativo" ---

                // Fondos
                background: "#fafaf9", // Stone 50 (Fondo crema suave)
                surface: "#ffffff",    // White (Para las tarjetas de casas)

                // Acción Principal (Botones, Links importantes)
                primary: {
                    DEFAULT: "#15803d", // Green 700 (Verde Árbol)
                    hover: "#14532d",   // Green 900 (Un poco más oscuro para hover)
                    foreground: "#ffffff" // Texto blanco sobre el botón verde
                },

                // Acentos (Detalles, Iconos, Bordes)
                accent: {
                    DEFAULT: "#5D4037", // Café Árbol (Nogal)
                    hover: "#4E342E",   // Un tono más oscuro para hover
                    foreground: "#ffffff" // Texto sobre café
                },

                // Texto
                textMain: "#1c1917",   // Stone 900 - Títulos y precios
                textMuted: "#57534e",  // Stone 600 - Descripciones

                // Alias para mantener compatibilidad con código existente
                secondary: "#5D4037",  // Igual que accent.DEFAULT
            },
        },
    },
    plugins: [],
};
export default config;
