"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../lib/db";

interface PropertyCardProps {
    property: {
        id: string | number;
        title: string;
        price: number;
        currency: string;
        type: string;
        location: string;
        specs: { beds: number; baths: number; size: number };
        premium: boolean;
        image: string;
    };
}

export default function PropertyCard({ property }: PropertyCardProps) {
    // Consulta reactiva a Dexie: Verifica si existe esta propiedad en favoritos
    const isFavorite = useLiveQuery(
        async () => {
            const definedPropertyId = property.id ?? property.title; // Fallback al título si no hay ID (solo por seguridad)
            const fav = await db.favorites.where('propertyId').equals(definedPropertyId).first();
            return !!fav;
        },
        [property.id]
    );

    const toggleFavorite = async (e: React.MouseEvent) => {
        e.preventDefault(); // Evitar navegación si la card es un enlace
        e.stopPropagation();

        if (isFavorite) {
            // Eliminar de favoritos (buscamos por propertyId)
            const definedPropertyId = property.id ?? property.title;
            await db.favorites.where('propertyId').equals(definedPropertyId).delete();
        } else {
            // Agregar a favoritos
            await db.favorites.add({
                propertyId: property.id ?? property.title,
                title: property.title,
                price: property.price,
                currency: property.currency,
                type: property.type,
                location: property.location,
                specs: property.specs,
                image: property.image,
                premium: property.premium,
                addedAt: new Date(),
            } as any); // Casting simple para evitar conflictos menores de tipos si faltan campos opcionales
        }
    };

    return (
        <div className="group bg-surface rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-primary/5 relative">
            <div className="relative h-64 overflow-hidden">
                {property.premium && (
                    <div className="absolute top-4 left-4 z-10 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">
                        Premium
                    </div>
                )}

                {/* Botón de Favoritos (Corazón) */}
                <button
                    onClick={toggleFavorite}
                    className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white transition-all shadow-sm group-hover:scale-110"
                    title={isFavorite ? "Quitar de favoritos" : "Guardar en favoritos"}
                >
                    <svg
                        className={`w-5 h-5 transition-colors duration-300 ${isFavorite ? 'text-red-500 fill-red-500' : 'text-white fill-transparent hover:text-red-500'}`} // Ajuste visual: rojo cuando es favorito
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                </button>

                <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
            </div>
            <div className="p-8">
                <p className="text-secondary font-bold text-xs uppercase tracking-widest mb-2">{property.type}</p>
                <h3 className="text-xl font-bold text-textMain mb-1 group-hover:text-primary transition-colors line-clamp-1">
                    {property.title}
                </h3>
                <p className="text-textMuted text-xs mb-4">{property.location}</p>

                <div className="flex items-center gap-4 text-textMuted text-sm mb-6 pb-6 border-b border-background">
                    <span className="flex items-center gap-1">🛏️ {property.specs.beds}</span>
                    <span className="flex items-center gap-1">🚿 {property.specs.baths}</span>
                    <span className="flex items-center gap-1">📐 {property.specs.size} m²</span>
                </div>

                <div className="flex justify-between items-center">
                    <p className="text-2xl font-bold text-primary">
                        ${property.price.toLocaleString()} {property.currency}
                    </p>
                    <button className="text-textMuted hover:text-primary transition-colors">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
