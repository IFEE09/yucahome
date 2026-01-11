import type { Metadata } from "next";
import { Inter, Playfair_Display, Allura } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const handwritten = Allura({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-handwritten",
});

export const metadata: Metadata = {
  title: "MindHaus | Propiedades Exclusivas",
  description: "Encuentra la propiedad de tus sueños en las zonas más exclusivas. Tu patrimonio en el corazón de la península.",
};

export const viewport = {
  themeColor: '#7CB342',
};

import { ToastProvider } from "../context/ToastContext";

// ... existing imports ...

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} ${handwritten.variable} antialiased`}>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}