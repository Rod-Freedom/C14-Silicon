import express from 'express';
import { loggedInMW } from "../utils/auth.js";
import mainRoutes from './mainRoutes.js';
import apiRoutes from './api/apiRoutes.js';

const router = express.Router();

router.use(loggedInMW);
router.use('/', mainRoutes);
router.use('/api', apiRoutes);

export default router;