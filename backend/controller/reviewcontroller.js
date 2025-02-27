import { Review } from '../models/reviewmodel.js';
import { User } from '../models/usersmodel.js';

export const createReview = async (req, res) => {
    const { userId, comment, rating } = req.body;

    // Validate request body
    if (!userId || !comment || !rating) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Check if user exists
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Create new review
        const review = await Review.create({ userId, comment, rating });
        res.status(201).json(review);
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({ error: 'Failed to create review' });
    }
};

export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.findAll();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
};

export const updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Review.update(req.body, { where: { id } });
        if (updated) {
            const updatedReview = await Review.findByPk(id);
            res.status(200).json(updatedReview);
        } else {
            res.status(404).json({ error: 'Review not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update review' });
    }
};

export const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Review.destroy({ where: { id } });
        if (deleted) {
            res.status(200).json({ message: 'Review deleted' });
        } else {
            res.status(404).json({ error: 'Review not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete review' });
    }
};