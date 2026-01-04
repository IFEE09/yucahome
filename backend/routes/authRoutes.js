import express from 'express';
import { login, createBroker } from '../controllers/userController.js';
import { authMiddleware, requireMaster } from '../middleware/auth.js';

const router = express.Router();

// Public Routes
router.post('/login', login);

// Protected Routes (Only Master can create brokers)
router.post('/brokers', authMiddleware, requireMaster, createBroker);

// Test protected route
router.get('/me', authMiddleware, (req, res) => {
    res.json({ message: 'Estás autenticado', user: req.user });
});

export default router;
