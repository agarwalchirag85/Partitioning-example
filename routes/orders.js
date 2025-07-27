import express from 'express';
import db from '../db.js';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const orders = await db('orders').select('*');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
