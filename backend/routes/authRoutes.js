import express from 'express';
import { login, createBroker } from '../controllers/userController.js';
import { authMiddleware, requireMaster } from '../middleware/auth.js';
import { sanitizeInputs, validateLoginInput, validateBrokerInput } from '../middleware/sanitize.js';

const router = express.Router();

// Aplicar sanitización a TODAS las rutas
router.use(sanitizeInputs);

// Public Routes
router.post('/login', validateLoginInput, login);

// Protected Routes (Only Master can create brokers)
router.post('/brokers', authMiddleware, requireMaster, validateBrokerInput, createBroker);

// Test protected route
router.get('/me', authMiddleware, (req, res) => {
    res.json({ message: 'Estás autenticado', user: req.user });
});

export default router;
