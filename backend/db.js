const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: String(process.env.DB_PASS),  // Ensure it's a string
    port: process.env.DB_PORT,
});

// Test the connection
pool.connect((err, client, release) => {
    if (err) {
        console.error('❌ Error acquiring client', err.stack);
        return;
    }
    console.log('✅ Database connected successfully');
    release();
});

// Handle pool errors
pool.on('error', (err, client) => {
    console.error('❌ Unexpected error on idle client', err);
    process.exit(-1);
});

module.exports = pool;
