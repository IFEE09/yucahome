interface PropertyCardProps {
    property: {
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
    return (
        <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gold/5">
            <div className="relative h-64 overflow-hidden">
                {property.premium && (
                    <div className="absolute top-4 left-4 z-10 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">
                        Premium
                    </div>
                )}
                <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
            </div>
            <div className="p-8">
                <p className="text-gold font-bold text-xs uppercase tracking-widest mb-2">{property.type}</p>
                <h3 className="text-xl font-bold text-secondary mb-1 group-hover:text-primary transition-colors line-clamp-1">
                    {property.title}
                </h3>
                <p className="text-gray-400 text-xs mb-4">{property.location}</p>

                <div className="flex items-center gap-4 text-gray-500 text-sm mb-6 pb-6 border-b border-gray-100">
                    <span className="flex items-center gap-1">🛏️ {property.specs.beds}</span>
                    <span className="flex items-center gap-1">🚿 {property.specs.baths}</span>
                    <span className="flex items-center gap-1">📐 {property.specs.size} m²</span>
                </div>

                <div className="flex justify-between items-center">
                    <p className="text-2xl font-bold text-secondary">
                        ${property.price.toLocaleString()} {property.currency}
                    </p>
                    <button className="text-secondary hover:text-primary transition-colors">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
