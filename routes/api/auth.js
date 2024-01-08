const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { pool } = require('../../database');
const QRCode = require('qrcode');

// Generate QR code function
const generateQRCode = async (userId) => {
  try {
    const qrCodeData = `User ID: ${userId}`; // Customize QR code data as needed
    const qrCodeBuffer = await QRCode.toBuffer(qrCodeData);
    const qrCodeBase64 = qrCodeBuffer.toString('base64');
    return qrCodeBase64;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw error;
  }
};

// Registration route
router.post('/register', async (req, res) => {
  console.log('Received registration request:', req.body);
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, hashedPassword]
    );

    const newUser = result.rows[0];
    const qrCodeData = await generateQRCode(newUser.id);

    res.status(200).json({ message: 'Registration successful!', user: newUser, qrCodeData });
  } catch (error) {
    console.error('Registration failed:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Login-Home route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [
      username,
      password,
    ]);

    const user = result.rows[0];
    if (user) {
      if (user.approved) {
        res.status(200).json({ approved: true, user });
      } else {
        res.status(200).json({ approved: false, message: 'User not approved. Contact the admin for approval.' });
      }
    } else {
      res.status(200).json({ approved: false, message: 'Invalid username or password.' });
    }
  } catch (error) {
    console.error('Login failed:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Protected route
router.get('/protected-route', (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ message: 'Authenticated user', user: req.user });
  } else {
    res.status(401).json({ message: 'Unauthenticated user' });
  }
});

// Logout route
router.post('/logout', (req, res) => {
  req.logout();
  res.status(200).json({ message: 'Logout successful' });
});

module.exports = router;