import { Booking } from '../models/bookingmodel.js';
import multer from 'multer';
import path from 'path';

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage }).single('documentFile');

const createBooking = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ error: "Failed to upload file" });
        }

        try {
            const { fullName, email, nationality, mobile, documentType, from, to, departure, return: returnDate, passengers } = req.body;
            const documentFile = req.file ? req.file.path : null;

            const newBooking = await Booking.create({
                fullName,
                email,
                nationality,
                mobile,
                documentType,
                documentFile,
                from,
                to,
                departure,
                return: returnDate,
                passengers,
            });

            res.status(201).json({ data: newBooking, message: "Booking created successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to create booking" });
        }
    });
};

const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.findAll();
        res.status(200).json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to retrieve bookings" });
    }
};

export const bookingController = {
    createBooking,
    getAllBookings,
};
