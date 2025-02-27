import express from 'express';
import { contactController } from '../controller/contactcontroller.js';

const router = express.Router();

router.post('/submit', contactController.submitContactForm);
router.get('/', contactController.getAllContacts); // Add this line to handle GET requests

export default router;