const express = require("express");
const db = require("../db");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

// Simple email regex
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ── POST /api/contacts ───────────────────────────────────────────
/**
 * @swagger
 * /api/contacts:
 *   post:
 *     summary: Create contact
 *     tags:
 *       - Contacts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *                 example: Nguyen Van A
 *               email:
 *                 type: string
 *                 example: nguyenvana@gmail.com
 *               phone:
 *                 type: string
 *                 example: 0901234567
 *               message:
 *                 type: string
 *                 example: I want to buy this property
 *     responses:
 *       201:
 *         description: Contact created successfully
 *       400:
 *         description: Validation error
 */
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        error: "name, email, and message are required",
      });
    }
    if (!EMAIL_RE.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const [id] = await db("contacts")
      .insert({ name, email, phone, message })
      .returning("id");
    return res.status(201).json({ message: "Contact saved successfully", id });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// ── GET /api/contacts ────────────────────────────────────────────
/**
 * @swagger
 * /api/contacts:
 *   get:
 *     summary: Get all contacts
 *     tags:
 *       - Contacts
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Contact list returned
 *       401:
 *         description: Unauthorized
 */
router.get("/", authenticateToken, async (req, res) => {
  try {
    const contacts = await db("contacts")
      .select("*")
      .orderBy("created_at", "desc");
    return res.json({ contacts });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
