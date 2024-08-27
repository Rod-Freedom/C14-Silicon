import express from 'express';
import { Like } from '../../models/index.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const { body, session: { user_id = body.user_id } } = req;

    body.user_id = user_id;
    const queries = { where: body }

    try {
        if (user_id === undefined) throw new Error('The user must be logged in.');
            
        const findLike = await Like.findOne(queries);

        if (findLike) await Like.destroy(queries)
        else await Like.create(body)

        const likeCount = await Like.findAndCountAll(queries);
        
        res.json(likeCount);

    } catch (err) {
        res.status(400).json(err);
    }
});

export default router;