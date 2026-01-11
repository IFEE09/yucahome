"use client";

import { useState, useEffect } from "react";
import { useToast } from "../context/ToastContext";

export default function SellerLeadPopup() {
    const { showToast } = useToast();
    const [isVisible, setIsVisible] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [confirming, setConfirming] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        phone: "",
        email: "",
    });

    useEffect(() => {
        // Show the teaser after a short delay
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 1500);

        // Listen for custom open event
        const handleOpen = () => {
            setShowForm(true);
        };
        window.addEventListener("open-seller-modal", handleOpen);

        return () => {
            clearTimeout(timer);
            window.removeEventListener("open-seller-modal", handleOpen);
        };
    }, []);

    const handlePreSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.surname || !formData.phone || !formData.email) {
            showToast("Por favor completa todos los campos obligatorios.", "error");
            return;
        }
        setConfirming(true);
    };

    const handleFinalSubmit = async () => {
        setLoading(true);
        try {
            const res = await fetch('http://localhost:4000/api/leads/seller', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                showToast("¡Gracias! Un asesor te contactará pronto.", "success");
                setShowForm(false);
                setIsVisible(false);
                setConfirming(false);
                setFormData({ name: "", surname: "", phone: "", email: "" });
            } else {
                const data = await res.json();
                showToast(data.message || "Error al enviar la información.", "error");
            }
        } catch (error) {
            console.error("Error submitting lead:", error);
            showToast("Error de conexión. Inténtalo de nuevo.", "error");
        } finally {
            setLoading(false);
        }
    };



    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // If completely dismissed, render nothing
    if (!isVisible && !showForm) return null;

    return (
        <>
            {/* TEASER BUBBLE (Bottom Right, above WhatsApp button) */}
            {!showForm && isVisible && (
                <div className="fixed bottom-24 right-6 z-40 animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out">
                    <div className="relative bg-white text-textMain rounded-2xl shadow-xl p-4 pr-10 flex items-center gap-4 border border-gray-100 max-w-[300px] md:max-w-sm cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all duration-300" onClick={() => setShowForm(true)}>
                        {/* Close Button X */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsVisible(false);
                            }}
                            className="absolute top-2 right-2 text-gray-300 hover:text-gray-500 transition-colors duration-300 p-1"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>

                        {/* Icon & Text */}
                        <div className="flex-shrink-0 bg-yellow-50 p-2.5 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                        </div>
                        <div>
                            <p className="font-bold text-sm leading-tight text-gray-800">¿Deseas vender tu propiedad?</p>
                            <p className="text-[11px] text-gray-500 mt-0.5 font-medium">Contáctanos ahora</p>
                        </div>
                    </div>
                </div>
            )}

            {/* FORM MODAL */}
            {showForm && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative animate-in zoom-in-95 duration-300">
                        {/* Modal Header */}
                        <div className="bg-primary p-6 relative">
                            <button
                                onClick={() => setShowForm(false)}
                                className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                            <h3 className="text-2xl font-bold text-white font-playfair">Vende con Nosotros</h3>
                            <p className="text-gray-100 text-sm mt-1">Compártenos tus datos</p>
                        </div>

                        {/* Form or Confirmation */}
                        {!confirming ? (
                            <form onSubmit={handlePreSubmit} className="p-6 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-textMuted uppercase">Nombre <span className="text-red-500">*</span></label>
                                        <input
                                            required
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                                            placeholder="Juan"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-textMuted uppercase">Apellido <span className="text-red-500">*</span></label>
                                        <input
                                            required
                                            type="text"
                                            name="surname"
                                            value={formData.surname}
                                            onChange={handleInputChange}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                                            placeholder="Pérez"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-textMuted uppercase">WhatsApp <span className="text-red-500">*</span></label>
                                    <input
                                        required
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                                        placeholder="(999) 123 4567"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-textMuted uppercase">Correo Electrónico <span className="text-red-500">*</span></label>
                                    <input
                                        required
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                                        placeholder="juan@ejemplo.com"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-secondary text-white font-bold py-3.5 rounded-xl hover:bg-secondary/90 transition-all shadow-lg mt-2"
                                >
                                    Enviar Información
                                </button>

                                <p className="text-[10px] text-center text-textMuted/60">
                                    Al enviar, aceptas ser contactado por nuestro equipo de ventas.
                                </p>
                            </form>
                        ) : (
                            <div className="p-8 text-center space-y-6 animate-in fade-in duration-300">
                                <div className="space-y-2">
                                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary mb-4">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-800">¿Son correctos tus datos?</h4>
                                    <p className="text-sm text-gray-500">Verifica la información para que podamos contactarte.</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl text-left text-sm space-y-2 border border-gray-100">
                                    <p><span className="font-bold text-gray-700 block text-xs uppercase mb-1">Nombre:</span> {formData.name} {formData.surname}</p>
                                    <p><span className="font-bold text-gray-700 block text-xs uppercase mb-1">WhatsApp:</span> {formData.phone}</p>
                                    <p><span className="font-bold text-gray-700 block text-xs uppercase mb-1">Correo:</span> {formData.email}</p>
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setConfirming(false)}
                                        className="flex-1 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors text-sm"
                                    >
                                        Corregir
                                    </button>
                                    <button
                                        onClick={handleFinalSubmit}
                                        disabled={loading}
                                        className="flex-[2] bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg text-sm flex items-center justify-center gap-2"
                                    >
                                        {loading ? (
                                            <>
                                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                                Enviando...
                                            </>
                                        ) : "Confirmar y Enviar"}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
