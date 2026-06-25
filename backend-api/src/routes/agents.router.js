const express = require('express');
const db = require('../db');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

function formatAgent(row) {
  return {
    id: row.id,
    name: row.name,
    role: row.title,       // frontend AgentCard expects 'role'
    title: row.title,
    phone: row.phone,
    office: row.phone,     // frontend AgentCard uses 'office'
    mobile: row.phone,
    email: row.email,
    image: row.image_url,  // frontend AgentCard uses 'image'
    image_url: row.image_url,
    photo: row.image_url,  // ContactAgentForm uses 'photo'
    bio: row.bio,
  };
}

// ── GET /api/agents ──────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const agents = await db('agents').select('*').orderBy('created_at', 'asc');
    return res.json({ agents: agents.map(formatAgent) });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// ── GET /api/agents/:id ──────────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const agent = await db('agents').where('id', req.params.id).first();
    if (!agent) {
      return res.status(404).json({ error: 'Agent not found' });
    }
    const properties = await db('properties').where('agent_id', req.params.id).orderBy('created_at', 'desc');
    return res.json({ ...formatAgent(agent), properties });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// ── POST /api/agents ─────────────────────────────────────────────
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name, title, phone, email, image_url, bio } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'name and email are required' });
    }
    const id = `agent-${Date.now()}`;
    await db('agents').insert({ id, name, title, phone, email, image_url, bio });
    const created = await db('agents').where('id', id).first();
    return res.status(201).json(formatAgent(created));
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// ── PUT /api/agents/:id ──────────────────────────────────────────
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const existing = await db('agents').where('id', req.params.id).first();
    if (!existing) {
      return res.status(404).json({ error: 'Agent not found' });
    }
    await db('agents').where('id', req.params.id).update(req.body);
    const updated = await db('agents').where('id', req.params.id).first();
    return res.json(formatAgent(updated));
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// ── DELETE /api/agents/:id ───────────────────────────────────────
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const existing = await db('agents').where('id', req.params.id).first();
    if (!existing) {
      return res.status(404).json({ error: 'Agent not found' });
    }
    await db('agents').where('id', req.params.id).del();
    return res.json({ message: 'Agent deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
