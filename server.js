const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { pool } = require('./database');
const errorHandler = require('./middleware/errorHandler');
const QRCode = require('qrcode');
const crypto = require('crypto');

// Import the auth route
const authRoutes = require('./routes/api/auth');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));
app.use(bodyParser.json());

// Configure express session
app.use(session({
  secret: generateSecretKey(),
  resave: false,
  saveUninitialized: false,
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Passport local strategy for authentication
passport.use(new LocalStrategy(
  { usernameField: 'username', passwordField: 'password' },
  async (username, password, done) => {
    try {
      const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
      const user = result.rows[0];

      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

// Passport serialization and deserialization
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    const user = result.rows[0];
    done(null, user);
  } catch (error) {
    done(error);
  }
});

// Routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', inventoryRoutes);

// Error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Function to generate a random secret key
function generateSecretKey() {
  const secretKey = crypto.randomBytes(32).toString('hex');
  console.log('Generated Secret Key:', secretKey);
  return secretKey;
}