const express = require('express');
const cors = require('cors');

const propertiesRouter = require('./routes/properties.router');
const agentsRouter = require('./routes/agents.router');
const contactsRouter = require('./routes/contacts.router');
const authRouter = require('./routes/auth.router');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// ── Middleware ──────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Health check ────────────────────────────────────────────────
app.get('/', (req, res) => {
  return res.json({ message: 'Real Estate API is running' });
});

// ── Routes ──────────────────────────────────────────────────────
app.use('/api/properties', propertiesRouter);
app.use('/api/agents', agentsRouter);
app.use('/api/contacts', contactsRouter);
app.use('/api/auth', authRouter);

// ── 404 ─────────────────────────────────────────────────────────
app.use((req, res) => {
  return res.status(404).json({ error: 'Resource not found' });
});

// ── Global error handler ─────────────────────────────────────────
app.use(errorHandler);

module.exports = app;
