import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import slugify from 'slugify';
import fs from 'fs';
import * as destinationController from '../controllers/destinationController.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Skip if no file is selected
        if (!file) {
            return cb(null, false);
        }
        // Create destination-specific folder
        const folderName = slugify(req.body.name, { lower: true });
        const destPath = path.join(__dirname, '..', 'uploads', 'destinations', folderName);
        // Create folder if it doesn't exist
        fs.mkdirSync(destPath, { recursive: true });
        cb(null, destPath);
    },
    filename: function (req, file, cb) {
        // Skip if no file is selected
        if (!file) {
            return cb(null, false);
        }
        
        // Get the file extension
        const ext = path.extname(file.originalname);
        // Get the filename without extension
        const nameWithoutExt = path.basename(file.originalname, ext);
        
        // Create the destination path
        const folderName = slugify(req.body.name, { lower: true });
        const destPath = path.join(__dirname, '..', 'uploads', 'destinations', folderName);
        
        // Check if file with same name exists
        const fullPath = path.join(destPath, file.originalname);
        if (fs.existsSync(fullPath)) {
            // If exists, add timestamp to make it unique
            const timestamp = Date.now();
            cb(null, `${nameWithoutExt}-${timestamp}${ext}`);
        } else {
            // If doesn't exist, use original filename
            cb(null, file.originalname);
        }
    }
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        // Skip validation if no file is selected
        if (!file) {
            return cb(null, false);
        }
        const allowedTypes = /jpeg|jpg|png|gif/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'));
        }
    }
});

// Configure multiple file uploads
const uploadFields = upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'detailImage1', maxCount: 1 },
    { name: 'detailImage2', maxCount: 1 }
]);

// Public routes
router.get('/', destinationController.getAllDestinations);
router.get('/search', destinationController.searchDestinations);
router.get('/:slug', destinationController.getDestinationBySlug);

// Protected routes (require authentication)
router.post('/', uploadFields, destinationController.createDestination);
router.put('/:slug', uploadFields, destinationController.updateDestination);
router.delete('/:slug', destinationController.deleteDestination);

export default router; 