"use client";

export default function MaintenancePage() {
    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
            {/* Flor Pulsante */}
            <div className="relative mb-12">
                {/* Círculos de pulso */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-40 h-40 rounded-full bg-primary/10 animate-ping" style={{ animationDuration: '2s' }} />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-primary/20 animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
                </div>

                {/* Flor SVG */}
                <div className="relative z-10 w-32 h-32 flex items-center justify-center animate-pulse">
                    <svg viewBox="0 0 100 100" className="w-28 h-28 text-primary drop-shadow-lg">
                        {/* Pétalos */}
                        <ellipse cx="50" cy="30" rx="12" ry="20" fill="currentColor" opacity="0.9">
                            <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="20s" repeatCount="indefinite" />
                        </ellipse>
                        <ellipse cx="70" cy="40" rx="12" ry="20" fill="currentColor" opacity="0.8" transform="rotate(72 50 50)" />
                        <ellipse cx="65" cy="65" rx="12" ry="20" fill="currentColor" opacity="0.85" transform="rotate(144 50 50)" />
                        <ellipse cx="35" cy="65" rx="12" ry="20" fill="currentColor" opacity="0.8" transform="rotate(216 50 50)" />
                        <ellipse cx="30" cy="40" rx="12" ry="20" fill="currentColor" opacity="0.9" transform="rotate(288 50 50)" />
                        {/* Centro */}
                        <circle cx="50" cy="50" r="10" fill="#954E28" className="drop-shadow-md" />
                        <circle cx="50" cy="50" r="6" fill="#B8642E" />
                    </svg>
                </div>
            </div>

            {/* Texto */}
            <div className="text-center max-w-md">
                <h1 className="text-3xl md:text-4xl font-bold text-textMain mb-4 font-playfair">
                    En <span className="text-primary italic">Construcción</span>
                </h1>
                <p className="text-textMuted text-base md:text-lg mb-8 leading-relaxed">
                    Estamos trabajando para brindarte la mejor experiencia. Esta sección estará disponible muy pronto.
                </p>

                {/* Botón volver */}
                <a
                    href="/"
                    className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Volver al Inicio
                </a>
            </div>

            {/* Footer discreto */}
            <p className="absolute bottom-8 text-textMuted/50 text-xs">
                © 2026 MindHouse
            </p>
        </div>
    );
}
