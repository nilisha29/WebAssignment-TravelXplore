import express from 'express';
import { createReview, getAllReviews, updateReview, deleteReview } from '../controller/reviewcontroller.js';

const router = express.Router();

router.post('/', createReview);
router.get('/', getAllReviews);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);

export default router;