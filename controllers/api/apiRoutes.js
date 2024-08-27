import express from 'express';
import userRouter from './userRoutes.js';
import postRouter from './postRoutes.js';
import likeRouter from './likeRoutes.js';

const router = express.Router();

router.use('/users', userRouter);
router.use('/posts', postRouter);
router.use('/likes', likeRouter);

export default router;