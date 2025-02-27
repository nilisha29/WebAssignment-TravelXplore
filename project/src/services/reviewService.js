import axios from 'axios';

const API_URL = 'http://localhost:5000/reviews';

export const createReview = async (reviewData) => {
    try {
        const response = await axios.post(API_URL, reviewData);
        return response.data;
    } catch (error) {
        console.error('Error creating review:', error);
        throw error;
    }
};

export const getAllReviews = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching reviews:', error);
        throw error;
    }
};

export const updateReview = async (id, reviewData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, reviewData);
        return response.data;
    } catch (error) {
        console.error('Error updating review:', error);
        throw error;
    }
};

export const deleteReview = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting review:', error);
        throw error;
    }
};