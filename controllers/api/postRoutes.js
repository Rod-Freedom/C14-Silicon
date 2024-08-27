import express from 'express';
import { User, Post, Like } from '../../models/index.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const allPosts = await Post.findAll({ include: [{ model: Like, }, { model: User, }] });
        
        res.json(allPosts);

    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/', async (req, res) => {
    const { body, session: { user_id = body.user_id } } = req;
    body.user_id = user_id;

    try {
        if (!user_id) throw new Error('The user must be logged in.')
    
        const newPost = await Post.create(body);
        res.json(newPost);

    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    const { params: { id } } = req;

    const queries = { where: { id: id } };

    try {
        const deletedPost = await Post.destroy(queries);
        res.json(deletedPost);

    } catch (err) {
        const { message } = err;
        res.status(400).json({ message });
    }
});

export default router;