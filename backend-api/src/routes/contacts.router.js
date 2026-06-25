const express = require('express');
const db = require('../db');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Simple email regex
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ── POST /api/contacts ───────────────────────────────────────────
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        error: 'name, email, and message are required',
      });
    }
    if (!EMAIL_RE.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const [id] = await db('contacts').insert({ name, email, phone, message }).returning('id');
    return res.status(201).json({ message: 'Contact saved successfully', id });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// ── GET /api/contacts ────────────────────────────────────────────
router.get('/', authenticateToken, async (req, res) => {
  try {
    const contacts = await db('contacts').select('*').orderBy('created_at', 'desc');
    return res.json({ contacts });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
