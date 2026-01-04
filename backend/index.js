import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Hardcoded data for Demo
const properties = [
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

// Routes
app.get('/', (req, res) => {
    res.json({
        message: 'Bienvenido a la API de Yucahome',
        status: 'Server running',
        version: '1.0.0'
    });
});

app.get('/api/properties', (req, res) => {
    res.json(properties);
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Servidor de Yucahome corriendo en http://localhost:${PORT}`);
});
