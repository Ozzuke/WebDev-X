const pool = require('../config/cloudDatabase'); // database access
const bcrypt = require('bcrypt'); // hash passwords

class User {
    static async create(email, password) {
        try {
            const hashedPw = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email',
            [email, hashedPw]
        )
        return result.rows[0];
        } catch (error) {
            console.error('Error creating user:', error);  // Log error for debugging
            throw error;
        }
        
    }

    static async findByEmail(email) {
        try {
            const result = await pool.query(
                'SELECT * FROM users WHERE email = $1',
                [email]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Error finding user by email:', error); 
            throw error;
        }
    }
}

module.exports = User;
