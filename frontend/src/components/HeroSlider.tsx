"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

const heroSlides = [
    {
        id: 1,
        image: '/images/hero_slide_1.png',
        title: 'Villa Moderna Temozón',
        type: 'Residencial',
        location: 'Temozón Norte, Mérida',
        price: '$12,500,000 MXN',
        propertyUrl: '/propiedades/villa-moderna-temozon'
    },
    {
        id: 2,
        image: '/images/hero_slide_2.png',
        title: 'Hacienda Colonial Centro',
        type: 'Hacienda Histórica',
        location: 'Centro, Mérida',
        price: '$28,000,000 MXN',
        propertyUrl: '/propiedades/hacienda-colonial-centro'
    },
    {
        id: 3,
        image: '/images/hero_slide_3.png',
        title: 'Casa Frente al Mar',
        type: 'Costera',
        location: 'Telchac Puerto',
        price: '$18,900,000 MXN',
        propertyUrl: '/propiedades/casa-frente-mar-telchac'
    },
    {
        id: 4,
        image: '/images/hero_slide_4.png',
        title: 'Penthouse Vista Ciudad',
        type: 'Departamento',
        location: 'Paseo de Montejo, Mérida',
        price: '$7,800,000 MXN',
        propertyUrl: '/propiedades/penthouse-vista-ciudad'
    },
    {
        id: 5,
        image: '/images/hero_slide_5.png',
        title: 'Eco Villa Selva',
        type: 'Eco Retreat',
        location: 'Tulum, Quintana Roo',
        price: '$22,500,000 MXN',
        propertyUrl: '/propiedades/eco-villa-selva'
    }
];

export default function HeroSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 6000); // Cambia cada 6 segundos

        return () => clearInterval(interval);
    }, []);

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    const currentProperty = heroSlides[currentSlide];

    return (
        <div className="absolute inset-0 z-0">
            {/* Slider de imágenes */}
            {heroSlides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className="object-cover brightness-[0.55]"
                        priority={index === 0}
                    />
                </div>
            ))}

            {/* Gradiente overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/40" />

            {/* Indicadores de slider */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                {heroSlides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentSlide
                                ? 'w-8 bg-primary'
                                : 'bg-white/50 hover:bg-white/80'
                            }`}
                        aria-label={`Ir a slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Tarjeta de propiedad actual */}
            <div className="absolute bottom-24 left-4 md:left-8 z-20 max-w-sm">
                <div className="glass-morphism rounded-2xl p-4 md:p-5 backdrop-blur-xl bg-white/90 border border-white/20 shadow-2xl transition-all duration-500">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-secondary">
                            {currentProperty.type}
                        </span>
                        <span className="text-[10px] md:text-xs text-textMuted">
                            {currentProperty.location}
                        </span>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-textMain mb-1 line-clamp-1">
                        {currentProperty.title}
                    </h3>
                    <p className="text-primary font-bold text-lg md:text-xl mb-3">
                        {currentProperty.price}
                    </p>
                    <a
                        href={currentProperty.propertyUrl}
                        className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold hover:bg-primary/90 transition-all shadow-lg group"
                    >
                        Ver Propiedad
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>
            </div>

            {/* Flechas de navegación (desktop) */}
            <button
                onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
                className="hidden md:flex absolute left-6 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all"
                aria-label="Slide anterior"
            >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
                className="hidden md:flex absolute right-6 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all"
                aria-label="Siguiente slide"
            >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    );
}
