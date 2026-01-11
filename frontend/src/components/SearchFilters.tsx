"use client";

import { useState, useRef, useEffect } from "react";

const LOCATION_OPTIONS = [
    "Norte",
    "Centro",
    "Oriente",
    "Poniente",
    "Sur",
    "Playas",
];

const TYPE_OPTIONS = [
    "Casa",
    "Residencia de Lujo",
    "Casa en Centro Histórico",
    "Departamento / Loft",
    "Terreno Residencial",
    "Terreno para Inversión",
    "Terrenos Industriales",
    "Terreno Comercial",
    "Oficina o Local Comercial",
];

const LIFESTYLE_OPTIONS = [
    "Estilo Urbano / Ciudad",
    "Estilo Residencial Familiar",
    "Estilo Naturaleza / Verde",
    "Estilo Playa / Costa",
    "Estilo Inversión / Rentabilidad",
    "Estilo Exclusivo / Premium",
    "Estilo Práctico / Funcional",
    "Estilo Retiro / Jubilados",
];

export default function SearchFilters() {
    const [location, setLocation] = useState("");
    const [type, setType] = useState("");
    const [lifestyle, setLifestyle] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    // Track which dropdown is open: 'location' | 'type' | 'lifestyle' | null
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const containerRef = useRef<HTMLDivElement>(null);

    // Close dropdowns when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setOpenDropdown(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleDropdown = (key: string) => {
        setOpenDropdown(openDropdown === key ? null : key);
    };

    const handleSelect = (key: string, value: string) => {
        if (key === "location") setLocation(value);
        if (key === "type") setType(value);
        if (key === "lifestyle") setLifestyle(value);
        setOpenDropdown(null);
    };

    return (
        <div
            ref={containerRef}
            className="bg-surface/95 md:bg-surface p-3 md:p-2 rounded-3xl md:rounded-full shadow-2xl flex flex-col md:flex-row gap-2 max-w-3xl mx-auto backdrop-blur-md relative z-20"
        >
            {/* Location Filter */}
            <div className="flex-1 px-4 md:px-6 py-2 md:py-3 border-b md:border-b-0 md:border-r border-background/50 flex flex-col items-center justify-center relative">
                <label className="block text-[9px] md:text-[10px] uppercase font-bold text-secondary mb-1 text-center w-full">
                    Ubicación
                </label>
                <button
                    onClick={() => toggleDropdown("location")}
                    className="w-full bg-transparent text-sm font-medium outline-none text-textMain flex items-center justify-center gap-1 cursor-pointer hover:text-primary transition-colors"
                >
                    <span className="truncate">
                        {location || "Selecciona"}
                    </span>
                    <svg
                        className={`w-4 h-4 text-textMuted transition-transform duration-200 ${openDropdown === "location" ? "rotate-180" : ""
                            }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </button>

                {/* Dropdown Menu */}
                {openDropdown === "location" && (
                    <div className="absolute top-full left-0 w-full md:min-w-[180px] bg-surface rounded-xl shadow-lg border border-primary/10 mt-2 overflow-hidden z-30 animate-in fade-in zoom-in-95 duration-200">
                        <div className="max-h-60 overflow-y-auto py-1">
                            {LOCATION_OPTIONS.map((opt) => (
                                <button
                                    key={opt}
                                    onClick={() => handleSelect("location", opt)}
                                    className={`w-full text-left px-4 py-2 text-sm hover:bg-primary/5 hover:text-primary transition-colors ${location === opt
                                        ? "bg-primary/5 text-primary font-semibold"
                                        : "text-textMain"
                                        }`}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Type Filter */}
            <div className="flex-1 px-4 md:px-6 py-2 md:py-3 border-b md:border-b-0 md:border-r border-background/50 flex flex-col items-center justify-center relative">
                <label className="block text-[9px] md:text-[10px] uppercase font-bold text-secondary mb-1 text-center w-full">
                    Tipo
                </label>
                <button
                    onClick={() => toggleDropdown("type")}
                    className="w-full bg-transparent text-sm font-medium outline-none text-textMain flex items-center justify-center gap-1 cursor-pointer hover:text-primary transition-colors"
                >
                    <span className="truncate">
                        {type || "Selecciona"}
                    </span>
                    <svg
                        className={`w-4 h-4 text-textMuted transition-transform duration-200 ${openDropdown === "type" ? "rotate-180" : ""
                            }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </button>

                {/* Dropdown Menu */}
                {openDropdown === "type" && (
                    <div className="absolute top-full left-0 w-full md:min-w-[200px] bg-surface rounded-xl shadow-lg border border-primary/10 mt-2 overflow-hidden z-30 animate-in fade-in zoom-in-95 duration-200">
                        <div className="max-h-60 overflow-y-auto py-1">
                            {TYPE_OPTIONS.map((opt) => (
                                <button
                                    key={opt}
                                    onClick={() => handleSelect("type", opt)}
                                    className={`w-full text-left px-4 py-2 text-sm hover:bg-primary/5 hover:text-primary transition-colors ${type === opt
                                        ? "bg-primary/5 text-primary font-semibold"
                                        : "text-textMain"
                                        }`}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Lifestyle Filter */}
            <div className="flex-1 px-4 md:px-6 py-2 md:py-3 border-b md:border-b-0 md:border-r border-background/50 flex flex-col items-center justify-center relative">
                <label className="block text-[9px] md:text-[10px] uppercase font-bold text-secondary mb-1 text-center w-full">
                    Estilo de Vida
                </label>
                <button
                    onClick={() => toggleDropdown("lifestyle")}
                    className="w-full bg-transparent text-sm font-medium outline-none text-textMain flex items-center justify-center gap-1 cursor-pointer hover:text-primary transition-colors"
                >
                    <span className="truncate">
                        {lifestyle ? lifestyle.replace("Estilo ", "") : "Selecciona"}
                    </span>
                    <svg
                        className={`w-4 h-4 text-textMuted transition-transform duration-200 ${openDropdown === "lifestyle" ? "rotate-180" : ""
                            }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </button>

                {/* Dropdown Menu */}
                {openDropdown === "lifestyle" && (
                    <div className="absolute top-full left-0 w-full md:min-w-[220px] bg-surface rounded-xl shadow-lg border border-primary/10 mt-2 overflow-hidden z-30 animate-in fade-in zoom-in-95 duration-200">
                        <div className="max-h-60 overflow-y-auto py-1">
                            {LIFESTYLE_OPTIONS.map((opt) => (
                                <button
                                    key={opt}
                                    onClick={() => handleSelect("lifestyle", opt)}
                                    className={`w-full text-left px-4 py-2 text-sm hover:bg-primary/5 hover:text-primary transition-colors ${lifestyle === opt
                                        ? "bg-primary/5 text-primary font-semibold"
                                        : "text-textMain"
                                        }`}
                                >
                                    {opt.replace("Estilo ", "")}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Min Price */}
            <div className="flex-1 px-4 md:px-6 py-2 md:py-3 border-b md:border-b-0 md:border-r border-background/50 flex flex-col items-center justify-center">
                <label className="block text-[9px] md:text-[10px] uppercase font-bold text-secondary mb-1 text-center w-full">
                    Presupuesto Mín.
                </label>
                <input
                    type="text"
                    inputMode="numeric"
                    placeholder="$MXN"
                    value={minPrice ? `$${Number(minPrice).toLocaleString("en-US")}` : ""}
                    onChange={(e) => {
                        const val = e.target.value.replace(/[^0-9]/g, "");
                        setMinPrice(val);
                    }}
                    className={`w-full bg-transparent text-sm font-medium outline-none text-center placeholder:text-textMuted/30 transition-colors ${!minPrice
                        ? "text-textMain"
                        : minPrice.length < 6
                            ? "text-red-500"
                            : "text-primary"
                        }`}
                />
            </div>

            {/* Max Price */}
            <div className="flex-1 px-4 md:px-6 py-2 md:py-3 flex flex-col items-center justify-center">
                <label className="block text-[9px] md:text-[10px] uppercase font-bold text-secondary mb-1 text-center w-full">
                    Presupuesto Máx.
                </label>
                <input
                    type="text"
                    inputMode="numeric"
                    placeholder="$MXN"
                    value={maxPrice ? `$${Number(maxPrice).toLocaleString("en-US")}` : ""}
                    onChange={(e) => {
                        const val = e.target.value.replace(/[^0-9]/g, "");
                        setMaxPrice(val);
                    }}
                    className={`w-full bg-transparent text-sm font-medium outline-none text-center placeholder:text-textMuted/30 transition-colors ${!maxPrice
                        ? "text-textMain"
                        : maxPrice.length < 7
                            ? "text-red-500"
                            : "text-primary"
                        }`}
                />
            </div>

            <button className="bg-primary text-white w-full md:w-auto px-10 py-4 rounded-2xl md:rounded-full font-bold hover:bg-primary/90 transition-all shadow-lg active:scale-95">
                Buscar
            </button>
        </div>
    );
}
