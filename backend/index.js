import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import leadRoutes from './routes/leadRoutes.js';
import { sanitizeInputs } from './middleware/sanitize.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10kb' }));
app.use(morgan('dev'));

// Servir imágenes estáticas
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Sanitización global para todas las rutas
app.use(sanitizeInputs);

// Database Connection
sequelize.sync({ alter: true }).then(() => {
    console.log('✅ Base de datos sincronizada (Esquema actualizado)');
}).catch(err => {
    console.error('❌ Error de DB:', err);
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/leads', leadRoutes);

// Properties array (temporal placeholder)
const properties = [];

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
