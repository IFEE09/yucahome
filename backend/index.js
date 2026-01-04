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

// Properties array - will be populated by brokers
const properties = [];

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
