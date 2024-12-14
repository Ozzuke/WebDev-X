const express = require('express');
const router = express.Router();
const {auth} = require('../middleware/auth');

const {
    createPost,
    getPosts,
    getPost,
    updatePost,
    deletePost,
    deleteAllPosts
} = require('../controllers/postController');

router.use(auth); // protect all routes

router.post('/', createPost); // /api/posts
router.get('/', getPosts); // /api/posts
router.delete('/', deleteAllPosts); // /api/posts
router.get('/:id', getPost); // /api/posts/:id e.g. /api/posts/3
router.put('/:id', updatePost); // /api/posts/:id e.g. /api/posts/3
router.delete('/:id', deletePost); // /api/posts/:id e.g. /api/posts/3

module.exports = router;
