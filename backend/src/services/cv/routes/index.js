import { Router } from 'express';
import { authMiddleware } from '../../../middlewares/auth.js';
import { uploadMiddleware } from '../../../middlewares/upload.js';
import {
  uploadCV,
  listCVs,
  getCVById,
  getCVRawText,
  updateAnalysis,
  deleteCV,
} from '../controller/cv-controller.js';

const router = Router();

// ── POST /cv/upload ───────────────────────────────────────────────────────────
router.post('/upload', authMiddleware, uploadMiddleware.single('cv'), uploadCV);

// ── GET /cv ───────────────────────────────────────────────────────────────────
router.get('/', authMiddleware, listCVs);

// ── GET /cv/:id ───────────────────────────────────────────────────────────────
router.get('/:id', authMiddleware, getCVById);

// ── GET /cv/:id/raw-text ──────────────────────────────────────────────────────
router.get('/:id/raw-text', authMiddleware, getCVRawText);

// ── PATCH /cv/:id/analysis ────────────────────────────────────────────────────
router.patch('/:id/analysis', authMiddleware, updateAnalysis);

// ── DELETE /cv/:id ────────────────────────────────────────────────────────────
router.delete('/:id', authMiddleware, deleteCV);

export default router;
