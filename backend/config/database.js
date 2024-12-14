const { Pool } = require('pg'); // for interacting with the PostgreSQL database

// create a new pool to the database
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'intro2webdev',
    password: 'password',
    port: 5432
});

// create tables if they don't exist
const initDB = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL
            );
    
            CREATE TABLE IF NOT EXISTS posts (
                id SERIAL PRIMARY KEY,
                body TEXT NOT NULL,
                date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                user_id INTEGER REFERENCES users(id)
            );
        `);
        console.log('Database initialized :)');
    } catch (error) {
        console.error('Error initializing database:', error)
    }
};

// call the function to create tables if need be
initDB();

// export the pool so other modules can use it
module.exports = pool;
