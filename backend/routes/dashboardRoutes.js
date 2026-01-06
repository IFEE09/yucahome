import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import upload from '../config/upload.js';
import {
    getMyProperties,
    createProperty,
    deleteProperty,
    getMyVipProperties,
    createVipProperty,
    deleteVipProperty
} from '../controllers/propertiesController.js';
import { sanitizeInputs } from '../middleware/sanitize.js';

const router = express.Router();

// Autenticación requerida siempre
router.use(authMiddleware);

// --- Rutas de Propiedades Estándar ---
router.get('/properties', getMyProperties);

// POST con imagen: primero upload, luego crea.
// Nota: sanitizeInputs no parsea multipart, así que confiamos en validar en controlador o tras upload 
router.post('/properties', upload.single('image'), createProperty);

router.delete('/properties/:id', deleteProperty);

// --- Rutas de Zonas VIP ---
router.get('/vip-properties', getMyVipProperties);
router.post('/vip-properties', upload.single('image'), createVipProperty);
router.delete('/vip-properties/:id', deleteVipProperty);

export default router;
