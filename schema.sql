-- Admin_Users table
CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  approved BOOLEAN DEFAULT false
);

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  approved BOOLEAN DEFAULT false
);

-- UserSettings table
CREATE TABLE IF NOT EXISTS user_settings (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) UNIQUE NOT NULL,
  sqfeet_calc BOOLEAN DEFAULT true,
  inventory_system BOOLEAN DEFAULT true,
  user_management BOOLEAN DEFAULT true,
  dashboard BOOLEAN DEFAULT false
);

-- BasicData table
CREATE TABLE IF NOT EXISTS BasicData (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    width NUMERIC NOT NULL,
    thickness NUMERIC NOT NULL,
    supplier VARCHAR(255) NOT NULL,
    coat VARCHAR(255) NOT NULL,
    condition VARCHAR(255) NOT NULL
);

-- Coats table
CREATE TABLE IF NOT EXISTS Coats (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Conditions table
CREATE TABLE IF NOT EXISTS Conditions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS inventory (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  width VARCHAR(50) NOT NULL,
  thickness VARCHAR(50) NOT NULL,
  supplier VARCHAR(255) NOT NULL,
  coat VARCHAR(50) NOT NULL,
  condition VARCHAR(50) NOT NULL,
  weight DECIMAL(10,2) NOT NULL,
  pricing DECIMAL(10,2) NOT NULL,
  barcode VARCHAR(255) UNIQUE NOT NULL
);

-- Inventory View table
CREATE TABLE IF NOT EXISTS inventory_view (
  id SERIAL PRIMARY KEY,
  inventory_id INT REFERENCES inventory(id) NOT NULL,
  user_id INT REFERENCES users(id) NOT NULL,
  name VARCHAR(255) NOT NULL,
  width VARCHAR(50) NOT NULL,
  thickness VARCHAR(50) NOT NULL,
  supplier VARCHAR(255) NOT NULL,
  coat_id INT REFERENCES Coats(id) NOT NULL,
  condition_id INT REFERENCES Conditions(id) NOT NULL,
  weight DECIMAL(10,2) NOT NULL,
  pricing DECIMAL(10,2) NOT NULL
);

-- Dashboard table
CREATE TABLE IF NOT EXISTS dashboard (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) NOT NULL,
  inventory_id INT REFERENCES inventory(id) NOT NULL,
  action_type VARCHAR(255) NOT NULL, -- Specify the type of action ("IN" or "OUT")
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Use the TIMESTAMP type for dates
);