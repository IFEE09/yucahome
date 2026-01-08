import Dexie, { type EntityTable } from 'dexie';

export interface FavoriteProperty {
    id: number; // ID autoincremental de la base de datos local
    propertyId: string | number; // ID original de la propiedad (puede venir del backend)
    title: string;
    price: number;
    currency: string;
    type: string;
    location: string;
    specs: { beds: number; baths: number; size: number };
    image: string;
    premium: boolean;
    addedAt: Date;
}

// Configuración de la base de datos Dexie
const db = new Dexie('YucahomeFavoritesDB') as Dexie & {
    favorites: EntityTable<
        FavoriteProperty,
        'id' // primary key "id" (for the autoincremented key)
    >;
};

// Esquema
db.version(1).stores({
    favorites: '++id, propertyId, title, type, location, addedAt' // Índices para búsquedas rápidas
});

export { db };
