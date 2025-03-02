import express from 'express';
import { bookingController } from '../controller/bookingcontroller.js';


const router = express.Router();

router.post('/create', bookingController.createBooking);
router.get('/', bookingController.getAllBookings);


export default router;