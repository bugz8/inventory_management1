const express = require('express');
const router = express.Router();
const { pool } = require('../../database');

// Get all inventory items
router.get('/inventory', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM inventory');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching inventory items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;