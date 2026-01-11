import express from 'express';
import { createSellerLead, getSellerLeads } from '../controllers/leadController.js';
import { authMiddleware, requireMaster } from '../middleware/auth.js';
import { sanitizeInputs } from '../middleware/sanitize.js';

const router = express.Router();

// Public route to capture leads
router.post('/seller', sanitizeInputs, createSellerLead);

// Protected route to view leads (only authorized users)
router.get('/seller', authMiddleware, getSellerLeads);

export default router;
