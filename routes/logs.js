import express from 'express';
import db from '../db.js';
const router = express.Router();

router.post('/', async (req, res) => {
  const { user_id, message } = req.body;
  try {
    const [log] = await db('logs').insert({ user_id, message }).returning('*');
    res.status(201).json(log);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
