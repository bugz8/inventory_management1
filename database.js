const { Pool } = require('pg');

const databaseConfig = {
  user: 'postgres',
  host: 'localhost',
  database: 'inventoryAqel',
  password: '123456',
  port: 5432,
};

const pool = new Pool(databaseConfig);

module.exports = {
  query: async (text, params) => {
    const client = await pool.connect();
    try {
      return await client.query(text, params);
    } finally {
      client.release();
    }
  },
};