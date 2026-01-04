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
                    DEFAULT: "#7CB342", // Verde Lima (brillante y amarillento)
                    hover: "#689F38",   // Un poco más oscuro para hover
                    foreground: "#ffffff" // Texto blanco sobre el botón verde
                },

                // Acentos (Detalles, Iconos, Bordes)
                accent: {
                    DEFAULT: "#954E28", // Café Terracota (cálido y rojizo)
                    hover: "#7A3F1F",   // Un tono más oscuro para hover
                    foreground: "#ffffff" // Texto sobre café
                },

                // Texto
                textMain: "#1c1917",   // Stone 900 - Títulos y precios
                textMuted: "#57534e",  // Stone 600 - Descripciones

                // Alias para mantener compatibilidad con código existente
                secondary: "#954E28",  // Igual que accent.DEFAULT
            },
        },
    },
    plugins: [],
};
export default config;
