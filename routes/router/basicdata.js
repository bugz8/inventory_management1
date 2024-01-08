const express = require('express');
const router = express.Router();
const { pool } = require('../../database');

// Get all users
router.get('/basicdata', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM basicdata');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching Basic Data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;