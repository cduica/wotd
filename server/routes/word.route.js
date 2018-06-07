import express from 'express';
import wordController from '../controllers/word.controller'

const router = express.Router();

// Automatically load word of the day when this route is hit
router.route('/')
    .get(wordController.load, wordController.getWord);

export default router;