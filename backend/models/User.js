const pool = require('../config/database'); // database access
const bcrypt = require('bcrypt'); // hash passwords

class User {
    static async create(email, password) {
        const hashedPw = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email',
            [email, hashedPw]
        )
        return result.rows[0];
    }

    static async findByEmail(email) {
        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );
        return result.rows[0];
    }
}

module.exports = User;
