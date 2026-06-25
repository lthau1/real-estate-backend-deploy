const express = require('express');
const db = require('../db');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// ── Helper: format a DB row into the shape the frontend expects ──
function formatProperty(row) {
  return {
    id: row.id,
    title: row.title,
    address: `${row.location}`,
    price: `$${Number(row.price).toLocaleString('en-US')}`,
    status: row.status,        // 'For sale' | 'For rent'
    image: row.image_url,
    stats: {
      bedrooms: row.bedrooms,
      bathrooms: row.bathrooms,
      area: row.area,
      garages: row.garages,
    },
    // Extra fields for detail page
    location: row.location,
    category: row.category,
    type: row.type,
    description: row.description,
    agent_id: row.agent_id,
    created_at: row.created_at,
  };
}

// ── GET /api/properties ──────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const { category, type, location, page = 1, limit = 12 } = req.query;

    let query = db('properties').select('*');

    if (category) query = query.where('category', category);
    if (type)     query = query.where('type', type);
    if (location) query = query.where('location', 'ilike', `%${location}%`);

    // Count total (for pagination)
    let countQuery = db('properties').count('id as count');
    if (category) countQuery = countQuery.where('category', category);
    if (type)     countQuery = countQuery.where('type', type);
    if (location) countQuery = countQuery.where('location', 'ilike', `%${location}%`);

    const offset = (Number(page) - 1) * Number(limit);
    const [rows, [{ count }]] = await Promise.all([
      query.orderBy('created_at', 'desc').limit(Number(limit)).offset(offset),
      countQuery,
    ]);

    // HTTP Caching headers
    res.set('Cache-Control', 'public, max-age=300');

    return res.json({
      properties: rows.map(formatProperty),
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: Number(count),
        totalPages: Math.ceil(Number(count) / Number(limit)),
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// ── GET /api/properties/:id ──────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const property = await db('properties').where('id', req.params.id).first();
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    // Fetch agent info alongside
    const agent = property.agent_id
      ? await db('agents').where('id', property.agent_id).first()
      : null;

    // HTTP Caching headers
    res.set('Cache-Control', 'public, max-age=300');

    return res.json({
      ...formatProperty(property),
      agent: agent
        ? {
            name: agent.name,
            phone: agent.phone,
            email: agent.email,
            photo: agent.image_url,
          }
        : null,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// ── POST /api/properties ─────────────────────────────────────────
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, price, location, category, type, bedrooms, bathrooms, garages, area, image_url, description, agent_id } = req.body;
    if (!title || !price || !location) {
      return res.status(400).json({ error: 'title, price, and location are required' });
    }

    const id = `prop-${Date.now()}`;
    const status = type === 'for-rent' ? 'For rent' : 'For sale';

    await db('properties').insert({
      id, title, price, location, category, type,
      bedrooms: bedrooms || 0,
      bathrooms: bathrooms || 0,
      garages: garages || 0,
      area: area || 0,
      status,
      image_url: image_url || `https://picsum.photos/seed/${id}/600/400`,
      description,
      agent_id,
    });

    const created = await db('properties').where('id', id).first();
    return res.status(201).json(formatProperty(created));
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// ── PUT /api/properties/:id ──────────────────────────────────────
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const existing = await db('properties').where('id', req.params.id).first();
    if (!existing) {
      return res.status(404).json({ error: 'Property not found' });
    }

    const updates = req.body;
    if (updates.type) {
      updates.status = updates.type === 'for-rent' ? 'For rent' : 'For sale';
    }

    await db('properties').where('id', req.params.id).update(updates);
    const updated = await db('properties').where('id', req.params.id).first();
    return res.json(formatProperty(updated));
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// ── DELETE /api/properties/:id ───────────────────────────────────
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const existing = await db('properties').where('id', req.params.id).first();
    if (!existing) {
      return res.status(404).json({ error: 'Property not found' });
    }
    await db('properties').where('id', req.params.id).del();
    return res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
