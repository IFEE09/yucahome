"use client";

import { useState, useRef } from 'react';

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

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function CreatePropertyModal({ isOpen, onClose, onSuccess }: Props) {
    const [isVip, setIsVip] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Referencia al formulario para extraer datos fácilmente
    const formRef = useRef<HTMLFormElement>(null);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!formRef.current) return;

        const formData = new FormData(formRef.current);
        const token = localStorage.getItem('token');

        // Endpoint dinámico según el tipo
        const endpoint = isVip
            ? 'http://localhost:4000/api/dashboard/vip-properties'
            : 'http://localhost:4000/api/dashboard/properties';

        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Error al crear la propiedad');
            }

            alert('Propiedad creada exitosamente!');
            onSuccess();
            onClose();

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4 bg-black/60 backdrop-blur-sm transition-all duration-300">
            <div className="bg-white w-full md:max-w-2xl rounded-t-[2rem] md:rounded-[2rem] shadow-2xl h-[92vh] md:h-auto md:max-h-[90vh] overflow-y-auto animate-slide-up md:animate-fade-in user-select-none">
                <div className="p-5 md:p-8 pb-20 md:pb-8"> {/* Padding extra bottom en móvil para scroll */}

                    {/* Header */}
                    <div className="flex justify-between items-center mb-6 sticky top-0 bg-white z-10 py-2 border-b md:border-none border-gray-100">
                        <h2 className="text-xl md:text-2xl font-bold font-playfair text-textMain">Nueva Propiedad</h2>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-textMuted hover:bg-red-50 hover:text-red-500 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>

                    {/* Selector de Tipo */}
                    <div className="flex bg-gray-100 p-1 rounded-xl mb-6 md:mb-8">
                        <button
                            type="button"
                            className={`flex-1 py-2.5 md:py-3 rounded-lg text-xs md:text-sm font-bold transition-all ${!isVip ? 'bg-white shadow text-primary' : 'text-textMuted hover:text-textMain'}`}
                            onClick={() => setIsVip(false)}
                        >
                            Propiedad Estándar
                        </button>
                        <button
                            type="button"
                            className={`flex-1 py-2.5 md:py-3 rounded-lg text-xs md:text-sm font-bold transition-all ${isVip ? 'bg-white shadow text-secondary' : 'text-textMuted hover:text-textMain'}`}
                            onClick={() => setIsVip(true)}
                        >
                            Zona VIP Exclusiva
                        </button>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-xs md:text-sm font-medium border border-red-100 flex items-center gap-2">
                            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            {error}
                        </div>
                    )}

                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                        {/* Foto Principal / Portada */}
                        <div>
                            <label className="flex justify-between items-center text-[10px] md:text-xs uppercase font-bold text-textMuted mb-2">
                                <span>{isVip ? 'Foto de Portada (Hero Background)' : 'Foto Principal'}</span>
                                {isVip && <span className="text-primary animate-pulse">✨ Se usará en el Home</span>}
                            </label>

                            <div className={`relative border-2 border-dashed rounded-2xl p-6 md:p-8 transition-colors text-center group active:scale-[0.99] touch-manipulation ${isVip ? 'border-primary/50 bg-primary/5 hover:border-primary' : 'border-gray-300 bg-gray-50 hover:border-primary'}`}>
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    required
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                />
                                <div className="flex flex-col items-center pointer-events-none">
                                    <div className={`w-12 h-12 rounded-full shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${isVip ? 'bg-primary text-white' : 'bg-white text-primary'}`}>
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <span className={`text-sm font-semibold transition-colors ${isVip ? 'text-primary' : 'text-textMain group-hover:text-primary'}`}>
                                        {isVip ? 'Seleccionar Portada Exclusiva' : 'Subir imagen'}
                                    </span>
                                    <span className="text-xs text-textMuted mt-1">
                                        {isVip ? 'Recomendado: Horizontal 1920x1080px (Alta Calidad)' : 'JPG, PNG o WEBP'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            <div>
                                <label className="block text-[10px] md:text-xs uppercase font-bold text-textMuted mb-2 px-1">Título</label>
                                <input name="title" required placeholder="Ej: Residencia Montebello" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:border-primary outline-none transition-all focus:bg-white" />
                            </div>
                            <div>
                                <label className="block text-[10px] md:text-xs uppercase font-bold text-textMuted mb-2 px-1">Precio ($)</label>
                                <input name="price" type="number" step="0.01" required placeholder="0.00" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:border-primary outline-none transition-all focus:bg-white" />
                            </div>
                            <div>
                                <label className="block text-[10px] md:text-xs uppercase font-bold text-textMuted mb-2 px-1">Ubicación</label>
                                <div className="relative">
                                    <select name="location" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:border-primary outline-none transition-all appearance-none focus:bg-white">
                                        <option value="">Selecciona...</option>
                                        {LOCATION_OPTIONS.map(opt => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                    <svg className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] md:text-xs uppercase font-bold text-textMuted mb-2 px-1">Estilo de Vida</label>
                                <div className="relative">
                                    <select name="lifestyle" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:border-primary outline-none transition-all appearance-none focus:bg-white">
                                        <option value="">Selecciona...</option>
                                        {LIFESTYLE_OPTIONS.map(opt => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                    <svg className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] md:text-xs uppercase font-bold text-textMuted mb-2 px-1">Tipo de Propiedad</label>
                                <div className="relative">
                                    <select name="type" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:border-primary outline-none transition-all appearance-none focus:bg-white">
                                        <option value="">Selecciona...</option>
                                        {TYPE_OPTIONS.map(opt => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                    <svg className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </div>
                            </div>
                        </div>

                        {/* Grid numérico - 2 columnas en movil, 4 en desktop */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                            <div>
                                <label className="block text-[10px] md:text-xs uppercase font-bold text-textMuted mb-2 px-1 text-center md:text-left">Habitaciones</label>
                                <input name="bedrooms" type="number" defaultValue="0" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 text-sm focus:border-primary outline-none transition-all text-center focus:bg-white" />
                            </div>
                            <div>
                                <label className="block text-[10px] md:text-xs uppercase font-bold text-textMuted mb-2 px-1 text-center md:text-left">Baños</label>
                                <input name="bathrooms" type="number" defaultValue="0" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 text-sm focus:border-primary outline-none transition-all text-center focus:bg-white" />
                            </div>
                            <div>
                                <label className="block text-[10px] md:text-xs uppercase font-bold text-textMuted mb-2 px-1 text-center md:text-left truncate" title="M² Construcción">M² (Constr.)</label>
                                <input name="area" type="number" placeholder="0" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 text-sm focus:border-primary outline-none transition-all text-center focus:bg-white" />
                            </div>
                            <div>
                                <label className="block text-[10px] md:text-xs uppercase font-bold text-textMuted mb-2 px-1 text-center md:text-left truncate" title="M² Terreno">M² (Terreno)</label>
                                <input name="landArea" type="number" placeholder="0" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 text-sm focus:border-primary outline-none transition-all text-center focus:bg-white" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] md:text-xs uppercase font-bold text-textMuted mb-2 px-1">Descripción</label>
                            <textarea name="description" rows={4} required placeholder="Detalles clave de la propiedad..." className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-primary outline-none transition-all resize-none focus:bg-white"></textarea>
                        </div>

                        <div className="pt-4 flex gap-3 md:gap-4 sticky bottom-0 bg-white pb-safe md:static md:pb-0 z-10 border-t md:border-none border-gray-100 mt-0 md:mt-0 p-4 -mx-5 md:mx-0 md:p-0">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 py-3.5 md:py-4 rounded-xl font-bold text-textMuted hover:bg-gray-100 transition-colors text-sm"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-[2] bg-primary text-white py-3.5 md:py-4 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg flex justify-center items-center text-sm disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                        Subiendo...
                                    </span>
                                ) : 'Publicar Propiedad'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
