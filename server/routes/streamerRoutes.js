import { Router } from 'express';
import { getStreamer, createStreamer, getAllStreamers, voteForStreamer } from '../controllers/streamerController';

const router = Router();

// GET /streamers/:streamerId
router.get('/:streamerId', getStreamer);

// POST /streamers
router.post('/', createStreamer);

// GET /streamers
router.get('/', getAllStreamers);

// PUT /streamers/:streamerId/vote
router.put('/:streamerId/vote', voteForStreamer);

export default router;
