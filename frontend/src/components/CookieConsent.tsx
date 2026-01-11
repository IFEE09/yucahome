"use client";

import { useState, useEffect } from "react";

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        // Check if consent was already given
        const consent = localStorage.getItem("yucahome_cookie_consent_v2");
        if (!consent) {
            setIsVisible(true);
            // Disable scrolling while modal is open
            document.body.style.overflow = "hidden";
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("yucahome_cookie_consent_v2", "true");
        setIsVisible(false);
        // Re-enable scrolling
        document.body.style.overflow = "unset";
    };

    if (!isMounted) return null;
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-4">
            {/* Backdrop - Blocks interaction */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" />

            {/* Modal Content */}
            <div className="relative bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-lg w-full transform transition-all animate-in fade-in zoom-in-95 duration-300 border border-gray-100">
                <div className="flex flex-col gap-4">
                    <div className="flex items-start gap-4">
                        <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-xl font-playfair font-bold text-textMain">Política de Privacidad y Cookies</h3>
                            <p className="text-textMuted text-sm mt-2 leading-relaxed">
                                Utilizamos cookies propias y de terceros para mejorar nuestros servicios y mostrarle publicidad relacionada con sus preferencias.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-3 mt-2 md:ml-16">
                        <button
                            onClick={handleAccept}
                            className="bg-primary text-white font-bold py-3 px-6 rounded-xl hover:bg-primary/90 transition-all shadow-lg text-sm flex-1 md:flex-none"
                        >
                            Aceptar y Continuar
                        </button>

                    </div>

                    <p className="text-[10px] text-gray-400 text-center md:text-left md:ml-16 mt-1">
                        Al hacer clic en "Aceptar", aceptas el almacenamiento de cookies en tu dispositivo.
                    </p>
                </div>
            </div>
        </div>
    );
}
