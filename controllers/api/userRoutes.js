import express from 'express';
import { User } from '../../models/index.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll();
        
        res.json(userData);

    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/', async (req, res) => {
    const { body } = req;

    try {
        const userData = await User.create(body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.logged_in = true;
            req.session.visited = true;

            res.status(200).json({ message: 'You\'re now logged in' });
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/login', async (req, res) => {
    const { body: { password, username } } = req;
    const errRes = { message: 'Incorrect email or password. Please try again!' };
    const queries = { where: { username: username } }

    try {
        const userData = await User.findOne(queries);

        if (!userData) return res.status(400).json(errRes)
            
        const validPassword = await userData.checkPassword(password);

        if (!validPassword) return res.status(400).json(errRes)

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.logged_in = true;
            req.session.visited = true;  
            
            res.status(200).json({ message: 'You\'re now logged in' });
        });
        

    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/logout', (req, res) => {
    const { session: { logged_in } } = req;

    if (logged_in) {
        req.session.destroy(() => {
            res.status(200).json({ message: 'You\'re now logged out' });
        });

    } else {
        res.status(404).end();
    }
});

export default router;