import { Router } from 'express';
import { validationResult } from 'express-validator';
import { authMiddleware } from '../../../middlewares/auth.js';
import {
  register,
  login,
  getMe,
  updateProfile,
  changePassword,
  deleteAccount,
} from '../controller/auth-controller.js';
import {
  registerValidation,
  loginValidation,
  profileValidation,
  passwordValidation,
} from '../validator/schema.js';

const router = Router();

// ── Validation middleware helper ──────────────────────────────────────────────
function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
}

// ── POST /auth/register ───────────────────────────────────────────────────────
router.post('/register', registerValidation, validate, register);

// ── POST /auth/login ──────────────────────────────────────────────────────────
router.post('/login', loginValidation, validate, login);

// ── GET /auth/me ──────────────────────────────────────────────────────────────
router.get('/me', authMiddleware, getMe);

// ── PATCH /auth/profile ───────────────────────────────────────────────────────
router.patch('/profile', authMiddleware, profileValidation, validate, updateProfile);

// ── PATCH /auth/password ──────────────────────────────────────────────────────
router.patch('/password', authMiddleware, passwordValidation, validate, changePassword);

// ── DELETE /auth/account ──────────────────────────────────────────────────────
router.delete('/account', authMiddleware, deleteAccount);

export default router;
