import express from 'express';
import {
    createEvent,
    getMyEvents,
    deleteEvent,
    getPublicEvent
} from '../controllers/eventController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .post(protect, createEvent)
    .get(protect, getMyEvents);

router.delete('/:id', protect, deleteEvent);

router.get('/public/:id', getPublicEvent);

export default router;
