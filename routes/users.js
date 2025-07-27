import express from 'express';
import db from '../db.js';
const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, created_at } = req.body;
  try {
    const [user] = await db('users').insert({ name, email, created_at }).returning('*');
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await db('users').select('*');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
