import express from 'express';
import wordRoutes from './word.route';

const router = express.Router();

router.use('/word', wordRoutes);

export default router;