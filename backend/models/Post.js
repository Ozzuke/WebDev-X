const pool = require('../config/database'); // database access
const sanitize = require('sanitize-html'); // for input sanitization

class Post {
    static async create(body, userId) {
        const result = await pool.query(
            'INSERT INTO posts (body, user_id) VALUES ($1, $2) RETURNING *',
            [sanitize(body), userId]
        );
        return result.rows[0];
    }

    static async findAll() {
        const result = await pool.query('SELECT * FROM posts ORDER BY date DESC');
        return result.rows;
    }

    static async findById(id) {
        const result = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
        return result.rows[0];
    }

    static async update(id, body) {
        const result = await pool.query(
            'UPDATE posts SET body = $1 WHERE id = $2 RETURNING *',
            [sanitize(body), id]
        );
        return result.rows[0];
    }

    static async delete(id) {
        await pool.query('DELETE FROM posts WHERE id = $1', [id]);
    }

    static async deleteAll() {
        await pool.query('DELETE FROM posts');
    }
}

module.exports = Post;
