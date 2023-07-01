import { Router } from 'express';
import {
    getAllStreamers,
    getStreamerById,
    voteForStreamer,
    createStreamer,
  } from '../controllers/streamersController.js';
  
const router = Router();

// GET /streamers/:streamerId
router.get('/:streamerId', getStreamerById);

// POST /streamers
router.post('/', createStreamer);

// GET /streamers
router.get('/', getAllStreamers);

// PUT /streamers/:streamerId/vote
router.put('/:streamerId/vote', voteForStreamer);

export default router;