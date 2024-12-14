const Post = require('../models/Post');

const createPost = async (req, res) => {
    try {
        const {body} = req.body;
        const post = await Post.create(body, req.user.id);
        res.status(201).json(post);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({error: 'Internal server error'});
    }
}

const getPosts = async (req, res) => {
    try {
        const posts = await Post.findAll();
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({error: 'Internal server error'});
    }
}

const getPost = async (req, res) => {
    try {
        const {id} = req.params;
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({error: 'Post not found'});
        }
        res.status(200).json(post);
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({error: 'Internal server error'});
    }
}

const updatePost = async (req, res) => {
    try {
        const {id} = req.params;
        const {body} = req.body;
        const post = await Post.update(id, body);
        if (!post) {
            return res.status(404).json({error: 'Post not found'});
        }
        res.status(200).json(post);
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({error: 'Internal server error'});
    }
}

const deletePost = async (req, res) => {
    try {
        const {id} = req.params;
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({error: 'Post not found'});
        }
        await Post.delete(id);
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({error: 'Internal server error'});
    }
}

const deleteAllPosts = async (req, res) => {
    try {
        await Post.deleteAll();
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting posts:', error);
        res.status(500).json({error: 'Internal server error'});
    }
}

module.exports = {
    createPost,
    getPosts,
    getPost,
    updatePost,
    deletePost,
    deleteAllPosts
};
