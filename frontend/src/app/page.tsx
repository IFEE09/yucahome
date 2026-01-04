import Image from "next/image";
import PropertyCard from "@/components/PropertyCard";
import WhatsAppButton from "@/components/WhatsAppButton";
import BlogCard from "@/components/BlogCard";

async function getProperties() {
  // In production, this would be an absolute URL
  const res = await fetch('http://localhost:4000/api/properties', { cache: 'no-store' })
    .catch(() => ({ json: () => [] })); // Fallback if backend is down

  if (typeof res.json === 'function') {
    return res.json();
  }
  return [];
}

const blogPosts = [
  {
    id: 1,
    title: "Guía Completa para Invertir en Mérida en 2026",
    excerpt: "Descubre por qué la capital de Yucatán sigue siendo el destino #1 para inversionistas nacionales y extranjeros.",
    image: "/images/blog1.png",
    category: "Inversión",
    date: "4 Ene, 2026",
    readTime: "5 min lect."
  },
  {
    id: 2,
    title: "Las 5 Playas con Mayor Plusvalía en Yucatán",
    excerpt: "Desde Telchac hasta Sisal, analizamos las zonas costeras que están transformando el mercado de lujo.",
    image: "/images/blog2.png",
    category: "Estilo de Vida",
    date: "2 Ene, 2026",
    readTime: "4 min lect."
  },
  {
    id: 3,
    title: "Terrenos Industriales: El Nuevo Auge de la Región",
    excerpt: "Cómo la infraestructura logística está detonando la demanda de tierra industrial en el corredor Mérida-Hunucmá.",
    image: "/images/blog3.png",
    category: "Negocios",
    date: "28 Dic, 2025",
    readTime: "6 min lect."
  }
];

export default async function Home() {
  const properties = await getProperties();

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-morphism border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl md:text-2xl font-bold tracking-tighter text-secondary flex items-end mb-1">
              <span className="font-handwritten text-4xl md:text-5xl normal-case mr-2 leading-none transform translate-y-1.5">Yuca</span>
              <span className="font-playfair text-primary mb-0.5">HOME</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-textMuted">
            <a href="#" className="hover:text-primary transition-colors">Propiedades</a>
            <a href="#" className="hover:text-primary transition-colors">Zonas VIP</a>
            <a href="#" className="hover:text-primary transition-colors">Guía de Inversión</a>
            <a href="#" className="hover:text-primary transition-colors">Nosotros</a>
          </div>

          <div className="flex items-center gap-4">
            <button className="bg-primary text-white px-5 md:px-6 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-semibold hover:bg-primary/90 transition-all shadow-lg">
              Catálogo
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] md:h-[90vh] flex items-center justify-center pt-20 pb-12">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero.png"
            alt="Luxury Home in Yucatan"
            fill
            className="object-cover brightness-[0.6] md:brightness-75"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/40" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 md:px-6">
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-4 md:mb-6 leading-[1.1] drop-shadow-2xl">
            Tu Patrimonio en el <br className="hidden md:block" />
            <span className="text-primary italic">Corazón de Yucatán</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 md:mb-12 max-w-2xl mx-auto drop-shadow-md">
            Encuentra la propiedad de tus sueños en las zonas más exclusivas de Yucatán, con asesoría personalizada.
          </p>

          <div className="bg-surface/95 md:bg-surface p-3 md:p-2 rounded-3xl md:rounded-full shadow-2xl flex flex-col md:flex-row gap-2 max-w-3xl mx-auto backdrop-blur-md">
            <div className="flex-1 px-4 md:px-6 py-2 md:py-3 border-b md:border-b-0 md:border-r border-background/50">
              <label className="block text-[9px] md:text-[10px] uppercase font-bold text-secondary mb-1">Ubicación</label>
              <select className="w-full bg-transparent text-sm font-medium outline-none text-textMain appearance-none">
                <option>Norte</option>
                <option>Centro</option>
                <option>Oriente</option>
                <option>Poniente</option>
                <option>Sur</option>
                <option>Playas</option>
              </select>
            </div>
            <div className="flex-1 px-4 md:px-6 py-2 md:py-3 border-b md:border-b-0 md:border-r border-background/50">
              <label className="block text-[9px] md:text-[10px] uppercase font-bold text-secondary mb-1">Tipo</label>
              <select className="w-full bg-transparent text-sm font-medium outline-none text-textMain appearance-none">
                <option>Residencia de Lujo</option>
                <option>Hacienda Histórica</option>
                <option>Departamento / Loft</option>
                <option>Terreno de Inversión</option>
                <option>Terrenos Industriales</option>
              </select>
            </div>
            <div className="flex-1 px-4 md:px-6 py-2 md:py-3 border-b md:border-b-0 md:border-r border-background/50">
              <label className="block text-[9px] md:text-[10px] uppercase font-bold text-secondary mb-1">Precio Mín.</label>
              <input
                type="text"
                placeholder="$ 0"
                className="w-full bg-transparent text-sm font-medium outline-none text-textMain placeholder:text-textMuted/30"
              />
            </div>
            <div className="flex-1 px-4 md:px-6 py-2 md:py-3">
              <label className="block text-[9px] md:text-[10px] uppercase font-bold text-secondary mb-1">Precio Máx.</label>
              <input
                type="text"
                placeholder="Sin límite"
                className="w-full bg-transparent text-sm font-medium outline-none text-textMain placeholder:text-textMuted/30"
              />
            </div>
            <button className="bg-primary text-white w-full md:w-auto px-10 py-4 rounded-2xl md:rounded-full font-bold hover:bg-primary/90 transition-all shadow-lg">
              Buscar
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-surface px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-1 md:space-y-2">
                <p className="text-3xl md:text-5xl font-bold text-textMain tracking-tight">{stat.value}</p>
                <p className="text-[10px] md:text-xs text-textMuted uppercase tracking-[0.2em] font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-16 md:py-24 bg-background px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-4">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-textMain mb-3 md:mb-4">
                Propiedades <span className="text-primary italic">Destacadas</span>
              </h2>
              <p className="text-textMuted text-sm md:text-base">Selección exclusiva en las mejores zonas de Yucatán.</p>
            </div>
            <a href="#" className="text-secondary font-bold text-sm border-b-2 border-secondary pb-1 hover:text-primary hover:border-primary transition-all">
              Ver Catálogo Completo
            </a>
          </div>

          {properties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {properties.map((prop: any) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 md:py-24 px-6 bg-surface/50 rounded-[2.5rem] border border-primary/5">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 md:w-12 md:h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-textMain mb-3 text-center">Próximamente Propiedades Exclusivas</h3>
              <p className="text-textMuted text-center max-w-md mb-8 text-sm md:text-base">
                Estamos trabajando para traerte las mejores opciones del estado.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <button className="bg-primary text-white px-8 py-3.5 rounded-full font-semibold hover:bg-primary/90 transition-all text-sm">
                  Notificarme
                </button>
                <button className="border-2 border-primary text-primary px-8 py-3.5 rounded-full font-semibold hover:bg-primary/5 transition-all text-sm">
                  Contactar Asesor
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Exclusive Service CTA */}
      <section className="py-16 md:py-24 bg-textMain overflow-hidden relative mx-4 md:mx-6 rounded-[2.5rem]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 text-center lg:text-left z-10">
            <h2 className="text-3xl md:text-6xl font-bold mb-6 font-playfair text-white leading-tight">Asesoría de <span className="text-primary italic">Guante Blanco</span></h2>
            <p className="text-white/70 text-base md:text-lg mb-8 md:mb-10 max-w-lg mx-auto lg:mx-0">
              Te acompañamos en todo el proceso para que tu única preocupación sea disfrutar de tu nuevo hogar.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <button className="bg-primary text-white px-10 py-4 rounded-full font-bold hover:bg-primary/90 transition-all shadow-xl">
                Asesoría VIP
              </button>
              <button className="border border-white/20 text-white px-10 py-4 rounded-full font-bold hover:bg-white/10 transition-all">
                Explorar Zonas
              </button>
            </div>
          </div>
          <div className="flex-1 relative w-full lg:h-[450px] aspect-square lg:aspect-auto bg-white/5 rounded-[2rem] border border-white/10 glass-morphism p-6 md:p-10 pointer-events-none">
            <div className="grid grid-cols-2 gap-4 h-full">
              <div className="h-full bg-primary/20 rounded-2xl animate-pulse" />
              <div className="space-y-4">
                <div className="h-[60%] bg-white/10 rounded-2xl" />
                <div className="h-[30%] bg-secondary/10 rounded-2xl" />
              </div>
              <div className="col-span-2 h-[20%] bg-white/5 rounded-2xl flex items-center px-6">
                <div className="h-2 w-3/4 bg-white/20 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 md:py-24 bg-background px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-5xl font-bold text-textMain mb-4 md:mb-6">
                Consejos y <span className="text-primary italic">Noticias</span>
              </h2>
              <p className="text-textMuted text-base md:text-lg">
                Mantente al día con las últimas tendencias de inversión y noticias exclusivas de Yucatán.
              </p>
            </div>
            <button className="text-primary font-bold text-sm border-b-2 border-primary pb-1 hover:text-secondary hover:border-secondary transition-all">
              Leer Todo el Blog
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {blogPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] py-16 md:py-24 text-white px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
            <div className="col-span-1 sm:col-span-2">
              <span className="text-2xl md:text-3xl font-bold tracking-tighter mb-6 block text-secondary">
                <span className="flex items-end">
                  <span className="font-handwritten text-6xl normal-case mr-3 leading-none transform translate-y-2.5">Yuca</span>
                  <span className="font-playfair text-primary mb-1">HOME</span>
                </span>
              </span>
              <p className="text-white/40 max-w-sm mb-8 text-sm md:text-base leading-relaxed">
                Líderes en el mercado inmobiliario de Yucatán. Brindamos servicios de alta gama para compradores exigentes que buscan excelencia y seguridad.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-all cursor-pointer text-sm">f</div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-all cursor-pointer text-sm">ig</div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-all cursor-pointer text-sm">in</div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-secondary uppercase text-[10px] md:text-xs tracking-widest">Accesos Rápidos</h4>
              <ul className="space-y-4 text-sm text-white/50">
                <li><a href="#" className="hover:text-primary transition-colors">Propiedades</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Zonas Residenciales</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog Inmobiliario</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacidad</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-secondary uppercase text-[10px] md:text-xs tracking-widest">Contacto</h4>
              <ul className="space-y-4 text-sm text-white/50">
                <li className="flex items-center gap-2">📍 Mérida, Yucatán</li>
                <li className="flex items-center gap-2">✉️ contacto@yucahome.com</li>
                <li className="flex items-center gap-2">📞 +52 999 123 4567</li>
              </ul>
            </div>
          </div>
          <div className="mt-16 md:mt-24 pt-8 border-t border-white/5 text-center flex flex-col items-center gap-4">
            <p className="text-white/30 text-[10px] md:text-xs">
              © 2026 YUCAHOME. Todos los derechos reservados.
            </p>
            <a
              href="/login"
              className="text-[9px] uppercase tracking-[0.2em] font-bold text-white/20 hover:text-primary transition-all pb-1 border-b border-transparent hover:border-primary"
            >
              ¿Eres Broker?
            </a>
          </div>
        </div>
      </footer>

      <WhatsAppButton />
    </main>
  );
}

const stats = [
  { label: "Propiedades", value: "+200" },
  { label: "Inversionistas", value: "+3k" },
  { label: "Años", value: "+10" },
  { label: "Satisfechos", value: "98%" },
];
