export default function BrokerLogin() {
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
                    <form className="space-y-6">
                        <div>
                            <label className="block text-xs uppercase font-bold text-secondary mb-2 px-1">Correo Electrónico</label>
                            <input
                                type="email"
                                placeholder="tu@correo.com"
                                className="w-full bg-background border border-primary/10 rounded-2xl px-5 py-4 text-sm outline-none focus:border-primary transition-all text-textMain"
                            />
                        </div>
                        <div>
                            <label className="block text-xs uppercase font-bold text-secondary mb-2 px-1">Contraseña</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-background border border-primary/10 rounded-2xl px-5 py-4 text-sm outline-none focus:border-primary transition-all text-textMain"
                            />
                        </div>

                        <button className="w-full bg-primary text-white py-4 rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl mt-4">
                            Iniciar Sesión
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
