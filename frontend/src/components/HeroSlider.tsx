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
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                >
                    <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className={`object-cover brightness-[0.55] transition-transform duration-[6000ms] ease-out ${index === currentSlide ? 'scale-110' : 'scale-100'}`}
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

            {/* Tarjeta de propiedad actual - Minimalista */}
            <div className="absolute bottom-32 md:bottom-24 left-6 md:left-12 z-20 max-w-sm pointer-events-none">
                <div className="flex flex-col items-start text-left space-y-2 pointer-events-auto">
                    <div className="bg-black/30 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/90">
                            {currentProperty.type}
                        </span>
                    </div>

                    <div className="space-y-1">
                        <h3 className="text-2xl md:text-3xl font-playfair font-bold text-white leading-tight drop-shadow-lg">
                            {currentProperty.title}
                        </h3>
                        <p className="text-white/80 text-sm md:text-base font-light flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-primary inline-block"></span>
                            {currentProperty.location}
                        </p>
                    </div>

                    <a
                        href={currentProperty.propertyUrl}
                        className="hidden md:flex group relative z-50 items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full text-white text-sm font-bold mt-6 hover:bg-white hover:text-black transition-all duration-300"
                    >
                        Explorar Propiedad
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
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
