import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { supabase } from '../../../config/supabase.js';

// ── Helper: sign JWT ──────────────────────────────────────────────────────────
function signToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
}

// ── POST /auth/register ───────────────────────────────────────────────────────
export async function register(req, res) {
  const { full_name, email, password } = req.body;

  // Check if email already exists
  const { data: existing } = await supabase
    .from('Users')
    .select('id')
    .eq('email', email)
    .maybeSingle();

  if (existing) {
    return res.status(409).json({ error: 'Email already registered' });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create user
  const { data: user, error } = await supabase
    .from('Users')
    .insert({ full_name, email, password: hashedPassword })
    .select('id, full_name, email, avatar_url, created_at')
    .single();

  if (error) {
    console.error('Register error:', error);
    return res.status(500).json({ error: 'Failed to create account' });
  }

  const token = signToken(user.id);
  const { password: _, ...safeUser } = user;

  res.status(201).json({ token, user: safeUser });
}

// ── POST /auth/login ──────────────────────────────────────────────────────────
export async function login(req, res) {
  const { email, password } = req.body;

  // Find user (include password for comparison)
  const { data: user, error } = await supabase
    .from('Users')
    .select('id, full_name, email, password, avatar_url, created_at, updated_at')
    .eq('email', email)
    .maybeSingle();

  if (error || !user) {
    return res.status(401).json({ error: 'Email atau password salah.' });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({ error: 'Email atau password salah.' });
  }

  const token = signToken(user.id);
  const { password: _, ...safeUser } = user;

  res.json({ token, user: safeUser });
}

// ── GET /auth/me ──────────────────────────────────────────────────────────────
export function getMe(req, res) {
  res.json({ user: req.user });
}

// ── PATCH /auth/profile ───────────────────────────────────────────────────────
export async function updateProfile(req, res) {
  const { full_name, avatar_url } = req.body;
  const updates = {};
  if (full_name !== undefined) updates.full_name = full_name;
  if (avatar_url !== undefined) updates.avatar_url = avatar_url;

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ error: 'No fields to update' });
  }

  updates.updated_at = new Date().toISOString();

  const { data: user, error } = await supabase
    .from('Users')
    .update(updates)
    .eq('id', req.user.id)
    .select('id, full_name, email, avatar_url, created_at, updated_at')
    .single();

  if (error) {
    console.error('Profile update error:', error);
    return res.status(500).json({ error: 'Failed to update profile' });
  }

  res.json({ user });
}

// ── PATCH /auth/password ──────────────────────────────────────────────────────
export async function changePassword(req, res) {
  const { current_password, new_password } = req.body;

  // Fetch current hashed password
  const { data: user, error: fetchError } = await supabase
    .from('Users')
    .select('password')
    .eq('id', req.user.id)
    .single();

  if (fetchError || !user) {
    return res.status(500).json({ error: 'Failed to verify current password' });
  }

  const valid = await bcrypt.compare(current_password, user.password);
  if (!valid) {
    return res.status(400).json({ error: 'Current password is incorrect' });
  }

  const hashed = await bcrypt.hash(new_password, 12);

  const { error: updateError } = await supabase
    .from('Users')
    .update({ password: hashed, updated_at: new Date().toISOString() })
    .eq('id', req.user.id);

  if (updateError) {
    return res.status(500).json({ error: 'Failed to update password' });
  }

  res.json({ message: 'Password updated successfully' });
}

// ── DELETE /auth/account ──────────────────────────────────────────────────────
export async function deleteAccount(req, res) {
  const userId = req.user.id;

  // Delete in order: Career_Matches → CV_Analysis → CV_uploads → Users
  const { data: cvUploads } = await supabase
    .from('CV_uploads')
    .select('id')
    .eq('users_id', userId);

  if (cvUploads?.length) {
    const cvIds = cvUploads.map(cv => cv.id);

    // Get CV_Analysis ids
    const { data: analyses } = await supabase
      .from('CV_Analysis')
      .select('id')
      .in('CV_upload_id', cvIds);

    if (analyses?.length) {
      const analysisIds = analyses.map(a => a.id);
      await supabase.from('Career_Matches').delete().in('CV_analysis_id', analysisIds);
      await supabase.from('CV_Analysis').delete().in('id', analysisIds);
    }

    await supabase.from('CV_uploads').delete().in('id', cvIds);
  }

  const { error } = await supabase.from('Users').delete().eq('id', userId);

  if (error) {
    return res.status(500).json({ error: 'Failed to delete account' });
  }

  res.json({ message: 'Account deleted successfully' });
}
