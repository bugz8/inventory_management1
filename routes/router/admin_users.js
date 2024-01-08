const express = require('express');
const router = express.Router();
const { pool } = require('../../database');

// Get all users
router.get('/admin_users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM admin_users');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching Admin Users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;