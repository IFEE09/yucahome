"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CreatePropertyModal from '@/components/CreatePropertyModal';

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // 1. Verificar autenticación
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');

        if (!token || !userData) {
            router.push('/login');
            return;
        }

        let parsedUser = JSON.parse(userData);

        // Hotfix: Auto-update legacy branding in local session
        if (parsedUser.name && parsedUser.name.includes('Yucahome')) {
            parsedUser.name = parsedUser.name.replace('Yucahome', 'MindHaus');
            localStorage.setItem('user', JSON.stringify(parsedUser));
        }

        setUser(parsedUser);
    }, [router]);

    if (!user) return null; // O un spinner de carga elegante

    return (
        <div className="min-h-screen bg-background">
            {/* Modal de Creación */}
            <CreatePropertyModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={() => {
                    // Aquí podríamos recargar las propiedades
                    alert('¡Listo! Tu propiedad está visible.');
                    // TODO: Recargar lista
                }}
            />

            {/* Navbar Dashboard */}
            <div className="fixed top-0 w-full z-50 glass-morphism border-b border-primary/10">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-xl font-bold tracking-tighter text-secondary flex items-end mb-1">
                            <span className="font-handwritten text-4xl normal-case mr-2 leading-none transform translate-y-1.5">Mind</span>
                            <span className="font-playfair text-primary mb-0.5">ADMIN</span>
                        </span>
                    </div>

                    <div className="flex items-center gap-6">
                        <span className="text-sm font-medium text-textMuted hidden md:block">
                            Hola, <span className="text-secondary font-bold">{user.name}</span>
                        </span>
                        <button
                            onClick={() => {
                                localStorage.clear();
                                router.push('/login');
                            }}
                            className="text-xs font-bold text-red-400 hover:text-red-500 transition-colors uppercase tracking-wider"
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </div>

            {/* Contenido Principal */}
            <main className="pt-32 pb-16 px-6 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-textMain font-playfair mb-2">
                            Panel de Control
                        </h1>
                        <p className="text-textMuted">Gestiona tu portafolio de propiedades exclusivas.</p>
                    </div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-primary text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-primary/30 hover:bg-primary/90 transition-all transform hover:-translate-y-1 flex items-center gap-3"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Subir Nueva Propiedad
                    </button>
                </div>

                {/* Estadísticas Rápidas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-surface p-8 rounded-[2rem] border border-primary/5 shadow-sm">
                        <h3 className="text-textMuted text-xs uppercase font-bold mb-2">Propiedades Activas</h3>
                        <p className="text-4xl font-playfair text-secondary font-bold">0</p>
                    </div>
                    <div className="bg-surface p-8 rounded-[2rem] border border-primary/5 shadow-sm">
                        <h3 className="text-textMuted text-xs uppercase font-bold mb-2">Vistas Totales</h3>
                        <p className="text-4xl font-playfair text-secondary font-bold">0</p>
                    </div>
                    <div className="bg-surface p-8 rounded-[2rem] border border-primary/5 shadow-sm">
                        <h3 className="text-textMuted text-xs uppercase font-bold mb-2">Clientes</h3>
                        <p className="text-4xl font-playfair text-secondary font-bold">0</p>
                    </div>
                </div>

                {/* Lista Vacía (Empty State) */}
                <div className="bg-surface rounded-[2.5rem] border border-primary/5 p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
                    <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mb-6 text-primary">
                        <svg className="w-8 h-8 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-textMain mb-2">Aún no tienes propiedades</h3>
                    <p className="text-textMuted max-w-md mx-auto mb-8">
                        Comienza a construir tu portafolio digital subiendo tu primera propiedad exclusiva.
                    </p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="text-primary font-bold hover:text-secondary transition-colors text-sm uppercase tracking-wider border-b border-primary/20 pb-1 hover:border-secondary"
                    >
                        Comenzar ahora
                    </button>
                </div>
            </main>
        </div>
    );
}
