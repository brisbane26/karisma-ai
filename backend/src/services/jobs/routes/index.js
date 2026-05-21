import { Router } from 'express';
import { authMiddleware } from '../../../middlewares/auth.js';
import {
  listJobs,
  getJobById,
  getCategories,
} from '../controller/jobs-controller.js';

const router = Router();

// ── GET /jobs ─────────────────────────────────────────────────────────────────
router.get('/', authMiddleware, listJobs);

// ── GET /jobs/meta/categories ─────────────────────────────────────────────────
router.get('/meta/categories', authMiddleware, getCategories);

// ── GET /jobs/:id ─────────────────────────────────────────────────────────────
router.get('/:id', authMiddleware, getJobById);

export default router;
