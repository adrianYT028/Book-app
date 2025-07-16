const pool = require('./db');

async function checkDatabase() {
    try {
        // Check if users table exists
        const usersCheck = await pool.query(`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name = 'users'
            );
        `);
        
        // Check if books table exists
        const booksCheck = await pool.query(`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name = 'books'
            );
        `);
        
        // Check if user_sessions table exists
        const sessionsCheck = await pool.query(`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name = 'user_sessions'
            );
        `);
        
        console.log('📋 Database Table Check:');
        console.log('✅ Users table exists:', usersCheck.rows[0].exists);
        console.log('✅ Books table exists:', booksCheck.rows[0].exists);
        console.log('✅ User_sessions table exists:', sessionsCheck.rows[0].exists);
        
        if (!usersCheck.rows[0].exists || !booksCheck.rows[0].exists) {
            console.log('\n🚨 Missing required tables! Creating them...');
            await createTables();
        } else {
            console.log('\n✅ All required tables exist!');
        }
        
    } catch (err) {
        console.error('❌ Database check failed:', err.message);
    } finally {
        process.exit();
    }
}

async function createTables() {
    try {
        // Create users table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        
        // Create books table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS books (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                author VARCHAR(255) NOT NULL,
                cover_url TEXT,
                rating INTEGER CHECK (rating >= 1 AND rating <= 5),
                notes TEXT,
                read_date DATE,
                user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        
        // Create session table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS user_sessions (
                sid VARCHAR NOT NULL COLLATE "default",
                sess JSON NOT NULL,
                expire TIMESTAMP(6) NOT NULL
            ) WITH (OIDS=FALSE);
        `);
        
        await pool.query(`
            ALTER TABLE user_sessions ADD CONSTRAINT session_pkey PRIMARY KEY (sid) NOT DEFERRABLE INITIALLY IMMEDIATE;
        `);
        
        console.log('✅ Tables created successfully!');
        
    } catch (err) {
        console.error('❌ Table creation failed:', err.message);
    }
}

checkDatabase();
