import express from 'express';
import { Post, Like, User } from '../models/index.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const { session: { logged_in, user_id } } = req;

    const queries = { include: [{ model: Like }, { model: User }] }

    try {
        const allPosts = await Post.findAll(queries);

        if (allPosts.length === 0) return res.render('feed', { logged_in, noposts: true });

        const posts = allPosts.map(postData => {
            const post = postData.get({ plain: true });
            post.like_count = post.likes.length;
            post.liked = post.likes.find(like => like.user_id === user_id) ? true : false;
            post.user = post.user.username;
            return post
        });
        
        res.render('feed', { logged_in, user_id, posts });

    } catch (err) {
        res.status(400).json(err);
    }
    
})

router.get('/login', (req, res) => {
    const { session: { logged_in } } = req;

    if (logged_in) res.redirect('/')
    else res.render('login', { logged_in });
})

export default router;