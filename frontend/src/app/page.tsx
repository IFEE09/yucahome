import Image from "next/image";
import PropertyCard from "@/components/PropertyCard";

async function getProperties() {
  // In production, this would be an absolute URL
  const res = await fetch('http://localhost:4000/api/properties', { cache: 'no-store' })
    .catch(() => ({ json: () => [] })); // Fallback if backend is down

  if (typeof res.json === 'function') {
    return res.json();
  }
  return [];
}

export default async function Home() {
  const properties = await getProperties();

  // Fallback data if API fails during build/run
  const displayProperties = properties.length > 0 ? properties : [
    {
      id: 1,
      title: 'Casa Hacienda Itzimná',
      price: 8450000,
      currency: 'MXN',
      type: 'Residencial',
      location: 'Itzimná, Mérida',
      specs: { beds: 3, baths: 4, size: 450 },
      premium: true,
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop'
    },
    {
      id: 2,
      title: 'Loft Moderno Cabo Norte',
      price: 3200000,
      currency: 'MXN',
      type: 'Departamento',
      location: 'Cabo Norte, Mérida',
      specs: { beds: 1, baths: 1.5, size: 120 },
      premium: false,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 3,
      title: 'Villa del Mar Telchac',
      price: 12500000,
      currency: 'MXN',
      type: 'Costa',
      location: 'Telchac Puerto',
      specs: { beds: 5, baths: 5, size: 600 },
      premium: true,
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=2074&auto=format&fit=crop'
    }
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-morphism border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tighter text-textMain font-playfair">
              YUCA<span className="text-primary">HOME</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-textMuted">
            <a href="#" className="hover:text-primary transition-colors">Propiedades</a>
            <a href="#" className="hover:text-primary transition-colors">Brokers</a>
            <a href="#" className="hover:text-primary transition-colors">Vender</a>
            <a href="#" className="hover:text-primary transition-colors">Nosotros</a>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-sm font-semibold text-textMain px-4 py-2 hover:bg-primary/5 rounded-full transition-all">
              Ingresar
            </button>
            <button className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl">
              Publicar Propiedad
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero.png"
            alt="Luxury Home in Yucatan"
            fill
            className="object-cover brightness-75"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/20" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
            Tu Patrimonio en el <br />
            <span className="text-primary italic">Corazón de Yucatán</span>
          </h1>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto drop-shadow-md">
            Conectamos a los mejores brokers del estado con compradores que buscan exclusividad, seguridad y el estilo de vida yucateco.
          </p>

          <div className="bg-surface p-2 rounded-2xl md:rounded-full shadow-2xl flex flex-col md:flex-row gap-2 max-w-3xl mx-auto backdrop-blur-md">
            <div className="flex-1 px-6 py-3 border-b md:border-b-0 md:border-r border-background">
              <label className="block text-[10px] uppercase font-bold text-secondary mb-1">Ubicación</label>
              <select className="w-full bg-transparent text-sm font-medium outline-none text-textMain">
                <option>Mérida, Centro</option>
                <option>Norte (Cabo Norte, Temozón)</option>
                <option>Costa (Progreso, Telchac)</option>
                <option>Pueblos Mágicos</option>
              </select>
            </div>
            <div className="flex-1 px-6 py-3 border-b md:border-b-0 md:border-r border-background">
              <label className="block text-[10px] uppercase font-bold text-secondary mb-1">Tipo de Propiedad</label>
              <select className="w-full bg-transparent text-sm font-medium outline-none text-textMain">
                <option>Residencia de Lujo</option>
                <option>Hacienda Histórica</option>
                <option>Departamento / Loft</option>
                <option>Terreno de Inversión</option>
              </select>
            </div>
            <div className="flex-1 px-6 py-3">
              <label className="block text-[10px] uppercase font-bold text-secondary mb-1">Rango de Precio</label>
              <select className="w-full bg-transparent text-sm font-medium outline-none text-textMain">
                <option>$2M - $5M MXN</option>
                <option>$5M - $10M MXN</option>
                <option>+$10M MXN</option>
              </select>
            </div>
            <button className="bg-primary text-white px-10 py-4 rounded-full font-bold hover:bg-primary/90 transition-all shadow-lg">
              Buscar
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div>
              <p className="text-4xl font-bold text-textMain mb-2">+500</p>
              <p className="text-sm text-textMuted uppercase tracking-widest">Propiedades</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-textMain mb-2">+120</p>
              <p className="text-sm text-textMuted uppercase tracking-widest">Brokers Certificados</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-textMain mb-2">+15</p>
              <p className="text-sm text-textMuted uppercase tracking-widest">Años de Confianza</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-textMain mb-2">98%</p>
              <p className="text-sm text-textMuted uppercase tracking-widest">Clientes Satisfechos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-textMain mb-4">Propiedades Destacadas</h2>
              <p className="text-textMuted">Selección exclusiva de inmuebles en las mejores zonas de Yucatán.</p>
            </div>
            <a href="#" className="text-secondary font-bold border-b-2 border-secondary pb-1 hover:text-primary hover:border-primary transition-all">Ver todas</a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayProperties.map((prop: any) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        </div>
      </section>

      {/* Broker CTA */}
      <section className="py-24 bg-textMain overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 text-white z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 font-playfair">¿Eres Broker en Yucatán?</h2>
            <p className="text-white/70 text-lg mb-10 max-w-lg">
              Únete a la red más exclusiva del estado. Publica tus propiedades, gestiona tus prospectos y cierra más ventas con nuestra tecnología.
            </p>
            <div className="flex gap-4">
              <button className="bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-primary/90 transition-all">
                Registrarme como Broker
              </button>
              <button className="border border-white/20 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all">
                Saber más
              </button>
            </div>
          </div>
          <div className="flex-1 relative h-[400px] w-full bg-white/5 rounded-3xl border border-white/10 glass-morphism p-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="h-32 bg-primary/20 rounded-2xl animate-pulse" />
              <div className="h-32 bg-white/10 rounded-2xl" />
              <div className="h-32 bg-white/10 rounded-2xl" />
              <div className="h-32 bg-secondary/10 rounded-3xl animate-pulse" />
            </div>
            <div className="mt-8 space-y-4">
              <div className="h-2 w-3/4 bg-white/10 rounded" />
              <div className="h-2 w-1/2 bg-white/10 rounded" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] py-20 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <span className="text-3xl font-bold tracking-tighter font-playfair mb-6 block">
                YUCA<span className="text-primary">HOME</span>
              </span>
              <p className="text-white/40 max-w-sm mb-8">
                Líderes en el mercado inmobiliario de Yucatán. Brindamos servicios de alta gama para brokers y compradores exigentes.
              </p>
              <div className="flex gap-4">
                {/* Social icons placeholders */}
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-all cursor-pointer">f</div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-all cursor-pointer">ig</div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-all cursor-pointer">in</div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-secondary uppercase text-xs tracking-widest">Accesos Rápidos</h4>
              <ul className="space-y-4 text-sm text-white/50">
                <li><a href="#" className="hover:text-primary transition-colors">Propiedades</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Nuestros Brokers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog Inmobiliario</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Aviso de Privacidad</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-secondary uppercase text-xs tracking-widest">Contacto</h4>
              <ul className="space-y-4 text-sm text-white/50">
                <li>Calle 60, Mérida, Yucatán</li>
                <li>contacto@yucahome.com</li>
                <li>+52 999 123 4567</li>
              </ul>
            </div>
          </div>
          <div className="mt-20 pt-8 border-t border-white/5 text-center text-white/30 text-xs">
            © 2026 YUCAHOME. Todos los derechos reservados. Desarrollado con ❤️ para Yucatán.
          </div>
        </div>
      </footer>
    </main>
  );
}
