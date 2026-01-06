"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BrokerLogin() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('http://localhost:4000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Error al iniciar sesión');
            }

            // Guardar token y redirigir
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            // Mostrar alerta de éxito temporal (opcional)
            // alert(`Bienvenido ${data.user.name} (${data.user.role})`);

            // Redirigir al dashboard
            router.push('/dashboard');

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
            <div className="max-w-md w-full">
                <div className="text-center mb-10">
                    <span className="text-2xl font-bold tracking-tighter text-secondary flex justify-center items-end mb-4">
                        <span className="font-handwritten text-6xl normal-case mr-3 leading-none transform translate-y-2.5">Yuca</span>
                        <span className="font-playfair text-primary mb-1">HOME</span>
                    </span>
                    <h1 className="text-3xl font-bold text-textMain mb-2">Acceso para Brokers</h1>
                    <p className="text-textMuted text-sm">Gestiona tus exclusivas y conecta con compradores de alto nivel.</p>
                </div>

                <div className="bg-surface p-8 rounded-[2rem] shadow-2xl border border-primary/5">
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 text-xs rounded-lg text-center font-medium">
                            {error}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-xs uppercase font-bold text-secondary mb-2 px-1">Correo Electrónico</label>
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="usuario@yucahome.com"
                                className="w-full bg-background border border-primary/10 rounded-2xl px-5 py-4 text-sm outline-none focus:border-primary transition-all text-textMain"
                            />
                        </div>
                        <div>
                            <label className="block text-xs uppercase font-bold text-secondary mb-2 px-1">Contraseña</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-background border border-primary/10 rounded-2xl px-5 py-4 text-sm outline-none focus:border-primary transition-all text-textMain"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary text-white py-4 rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl mt-4 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
                        >
                            {loading ? (
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : 'Iniciar Sesión'}
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-background text-center">
                        <p className="text-xs text-textMuted leading-relaxed px-4">
                            Si aún no eres parte de nuestra red exclusiva de brokers, contacta a soporte para verificar tu cuenta.
                        </p>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <a href="/" className="text-primary font-bold text-xs hover:text-secondary transition-all">
                        ← Volver al portal de compradores
                    </a>
                </div>
            </div>
        </div>
    );
}
