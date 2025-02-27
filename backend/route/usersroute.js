import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    updateUserProfile,
    getUserProfile
} from '../controller/userscontroller.js';

const router = express.Router();

router.get('/', authenticateToken, getAllUsers);
router.get('/profile', authenticateToken, getUserProfile);
router.get('/:id', authenticateToken, getUserById);
router.post('/', authenticateToken, createUser);
router.put('/profile', authenticateToken, upload.single('profilePic'), updateUserProfile);
router.put('/:id', authenticateToken, updateUser);
router.delete('/:id', authenticateToken, deleteUser);

export default router;