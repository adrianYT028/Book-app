const pool = require('./db');

async function checkUsers() {
    try {
        const result = await pool.query('SELECT id, username, email FROM users');
        console.log('📋 Existing users in database:');
        if (result.rows.length === 0) {
            console.log('❌ No users found! You need to register a user first.');
            console.log('💡 Go to http://localhost:3000/register to create an account');
        } else {
            console.log('✅ Found', result.rows.length, 'users:');
            result.rows.forEach(user => {
                console.log(`   - ID: ${user.id}, Username: ${user.username}, Email: ${user.email}`);
            });
        }
    } catch (err) {
        console.error('❌ Error checking users:', err.message);
    } finally {
        process.exit();
    }
}

checkUsers();
