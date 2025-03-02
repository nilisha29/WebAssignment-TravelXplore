import Destination from '../models/Destination.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import slugify from 'slugify';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base uploads directory
const UPLOADS_DIR = path.join(__dirname, '..', 'uploads', 'destinations');

// Helper function to ensure destination directory exists
const ensureDestinationDir = async (destinationName) => {
    const folderName = slugify(destinationName, { lower: true });
    const destDir = path.join(UPLOADS_DIR, folderName);
    await fs.mkdir(destDir, { recursive: true });
    return { folderName, destDir };
};

// Helper function to generate image URL
const generateImageUrl = (folderName, filename) => {
    if (!filename || !folderName) return null;
    return `/uploads/destinations/${folderName}/${filename}`;
};

// Helper function to process image upload
const processImageUpload = (file, folderName) => {
    if (!file) return null;
    return {
        filename: file.originalname,
        url: generateImageUrl(folderName, file.originalname)
    };
};

// Helper function to delete file if exists
const deleteFileIfExists = async (folderName, filename) => {
    if (!filename || !folderName) return;
    const filePath = path.join(UPLOADS_DIR, folderName, filename);
    try {
        await fs.unlink(filePath);
    } catch (error) {
        console.error(`Error deleting file ${filePath}:`, error);
    }
};

// Get all destinations with basic information
export const getAllDestinations = async (req, res) => {
    try {
        const destinations = await Destination.findAll({
            attributes: ['name', 'shortDescription', 'basePrice', 'mainImage', 'urlSlug']
        });
        
        // Transform mainImage to full URL
        const transformedDestinations = destinations.map(dest => ({
            ...dest.toJSON(),
            mainImage: generateImageUrl(slugify(dest.name, { lower: true }), dest.mainImage)
        }));
        
        res.status(200).json(transformedDestinations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching destinations', error: error.message });
    }
};

// Get detailed information for a specific destination
export const getDestinationBySlug = async (req, res) => {
    try {
        const destination = await Destination.findOne({
            where: { urlSlug: req.params.slug }
        });
        
        if (!destination) {
            return res.status(404).json({ message: 'Destination not found' });
        }

        const folderName = slugify(destination.name, { lower: true });
        
        // Transform image paths to URLs and include additional image information
        const transformedDestination = {
            ...destination.toJSON(),
            mainImage: {
                url: generateImageUrl(folderName, destination.mainImage),
                filename: destination.mainImage,
                preview: generateImageUrl(folderName, destination.mainImage)
            },
            destinationDetailImages: {
                image1: {
                    url: generateImageUrl(folderName, destination.destinationDetailImages.image1),
                    filename: destination.destinationDetailImages.image1,
                    preview: generateImageUrl(folderName, destination.destinationDetailImages.image1)
                },
                image2: {
                    url: generateImageUrl(folderName, destination.destinationDetailImages.image2),
                    filename: destination.destinationDetailImages.image2,
                    preview: generateImageUrl(folderName, destination.destinationDetailImages.image2)
                }
            }
        };
        
        res.status(200).json(transformedDestination);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching destination', error: error.message });
    }
};

// Create a new destination
export const createDestination = async (req, res) => {
    try {
        const { folderName } = await ensureDestinationDir(req.body.name);

        // Process uploaded images
        const mainImage = processImageUpload(req.files?.mainImage?.[0], folderName);
        const detailImage1 = processImageUpload(req.files?.detailImage1?.[0], folderName);
        const detailImage2 = processImageUpload(req.files?.detailImage2?.[0], folderName);

        // Handle the multipart form data
        const destinationData = {
            name: req.body.name,
            shortDescription: req.body.shortDescription,
            basePrice: parseFloat(req.body.basePrice),
            mainImage: mainImage?.filename,
            destinationDetailImages: {
                image1: detailImage1?.filename,
                image2: detailImage2?.filename
            },
            detailedDescription: JSON.parse(req.body.detailedDescription || '[]'),
            flightInformation: JSON.parse(req.body.flightInformation || '{}')
        };

        // Create new destination - urlSlug will be auto-generated
        const destination = await Destination.create(destinationData);

        // Transform response to include image URLs
        const response = {
            ...destination.toJSON(),
            mainImage: mainImage?.url,
            destinationDetailImages: {
                image1: detailImage1?.url,
                image2: detailImage2?.url
            }
        };

        res.status(201).json({
            destination: response,
            message: `Destination created successfully with URL slug: ${destination.urlSlug}`
        });
    } catch (error) {
        // Clean up uploaded files if there's an error
        if (req.files) {
            const folderName = slugify(req.body.name, { lower: true });
            Object.values(req.files).forEach(async (fileArray) => {
                if (fileArray?.[0]?.filename) {
                    await deleteFileIfExists(folderName, fileArray[0].filename);
                }
            });
        }

        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: 'A destination with this name already exists' });
        }
        res.status(400).json({ message: 'Error creating destination', error: error.message });
    }
};

// Update a destination
export const updateDestination = async (req, res) => {
    try {
        const existingDestination = await Destination.findOne({
            where: { urlSlug: req.params.slug }
        });
        
        if (!existingDestination) {
            return res.status(404).json({ message: 'Destination not found' });
        }

        const folderName = slugify(existingDestination.name, { lower: true });
        
        // Process new uploaded images only if files are selected
        const mainImage = req.files?.mainImage?.[0] ? 
            processImageUpload(req.files.mainImage[0], folderName) : 
            { 
                filename: existingDestination.mainImage, 
                url: generateImageUrl(folderName, existingDestination.mainImage),
                preview: generateImageUrl(folderName, existingDestination.mainImage)
            };

        const detailImage1 = req.files?.detailImage1?.[0] ? 
            processImageUpload(req.files.detailImage1[0], folderName) : 
            { 
                filename: existingDestination.destinationDetailImages.image1, 
                url: generateImageUrl(folderName, existingDestination.destinationDetailImages.image1),
                preview: generateImageUrl(folderName, existingDestination.destinationDetailImages.image1)
            };

        const detailImage2 = req.files?.detailImage2?.[0] ? 
            processImageUpload(req.files.detailImage2[0], folderName) : 
            { 
                filename: existingDestination.destinationDetailImages.image2, 
                url: generateImageUrl(folderName, existingDestination.destinationDetailImages.image2),
                preview: generateImageUrl(folderName, existingDestination.destinationDetailImages.image2)
            };

        // Handle the multipart form data
        const updateData = {
            name: req.body.name || existingDestination.name,
            shortDescription: req.body.shortDescription || existingDestination.shortDescription,
            basePrice: req.body.basePrice ? parseFloat(req.body.basePrice) : existingDestination.basePrice,
            detailedDescription: req.body.detailedDescription ? JSON.parse(req.body.detailedDescription) : existingDestination.detailedDescription,
            flightInformation: req.body.flightInformation ? JSON.parse(req.body.flightInformation) : existingDestination.flightInformation,
            mainImage: mainImage.filename,
            destinationDetailImages: {
                image1: detailImage1.filename,
                image2: detailImage2.filename
            }
        };

        // Only delete old images if new ones are uploaded
        if (req.files?.mainImage?.[0]) {
            await deleteFileIfExists(folderName, existingDestination.mainImage);
        }
        if (req.files?.detailImage1?.[0]) {
            await deleteFileIfExists(folderName, existingDestination.destinationDetailImages.image1);
        }
        if (req.files?.detailImage2?.[0]) {
            await deleteFileIfExists(folderName, existingDestination.destinationDetailImages.image2);
        }

        // If name is being updated, move the images to new folder
        if (updateData.name && updateData.name !== existingDestination.name) {
            const newFolderName = slugify(updateData.name, { lower: true });
            const { destDir: newDir } = await ensureDestinationDir(updateData.name);
            const oldFolderName = folderName;

            // Move existing images to new folder
            const moveFile = async (filename) => {
                if (!filename) return filename;
                const oldPath = path.join(UPLOADS_DIR, oldFolderName, filename);
                const newPath = path.join(newDir, filename);
                try {
                    await fs.rename(oldPath, newPath);
                    return filename;
                } catch (error) {
                    console.error(`Error moving file ${filename}:`, error);
                    return null;
                }
            };

            // Move all images to new folder
            await moveFile(updateData.mainImage);
            await moveFile(updateData.destinationDetailImages.image1);
            await moveFile(updateData.destinationDetailImages.image2);

            // Try to remove old directory
            try {
                await fs.rmdir(path.join(UPLOADS_DIR, oldFolderName));
            } catch (error) {
                console.error('Error removing old directory:', error);
            }
        }

        // Update the destination
        await existingDestination.update(updateData);

        // Get the final folder name (either new or existing)
        const finalFolderName = slugify(updateData.name || existingDestination.name, { lower: true });

        // Transform response to include image URLs and previews
        const response = {
            ...existingDestination.toJSON(),
            mainImage: {
                url: mainImage.url,
                filename: mainImage.filename,
                preview: mainImage.preview
            },
            destinationDetailImages: {
                image1: {
                    url: detailImage1.url,
                    filename: detailImage1.filename,
                    preview: detailImage1.preview
                },
                image2: {
                    url: detailImage2.url,
                    filename: detailImage2.filename,
                    preview: detailImage2.preview
                }
            }
        };

        res.status(200).json({
            message: 'Destination updated successfully',
            destination: response
        });
    } catch (error) {
        // Clean up any newly uploaded files if there's an error
        if (req.files) {
            const folderName = slugify(req.body.name || existingDestination.name, { lower: true });
            Object.values(req.files).forEach(async (fileArray) => {
                if (fileArray?.[0]?.filename) {
                    await deleteFileIfExists(folderName, fileArray[0].filename);
                }
            });
        }
        res.status(400).json({ message: 'Error updating destination', error: error.message });
    }
};

// Delete a destination
export const deleteDestination = async (req, res) => {
    try {
        const destination = await Destination.findOne({
            where: { urlSlug: req.params.slug }
        });

        if (!destination) {
            return res.status(404).json({ message: 'Destination not found' });
        }

        const folderName = slugify(destination.name, { lower: true });
        const destDir = path.join(UPLOADS_DIR, folderName);

        // Delete the entire destination folder
        try {
            await fs.rm(destDir, { recursive: true, force: true });
        } catch (error) {
            console.error('Error deleting destination folder:', error);
        }

        // Delete the destination
        await destination.destroy();

        res.status(200).json({ message: 'Destination deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting destination', error: error.message });
    }
};

// Search destinations
export const searchDestinations = async (req, res) => {
    try {
        const { query } = req.query;
        const destinations = await Destination.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${query}%` } },
                    { shortDescription: { [Op.iLike]: `%${query}%` } }
                ]
            },
            attributes: ['name', 'shortDescription', 'basePrice', 'mainImage', 'urlSlug']
        });

        // Transform mainImage to full URL
        const transformedDestinations = destinations.map(dest => ({
            ...dest.toJSON(),
            mainImage: generateImageUrl(slugify(dest.name, { lower: true }), dest.mainImage)
        }));

        res.status(200).json(transformedDestinations);
    } catch (error) {
        res.status(500).json({ message: 'Error searching destinations', error: error.message });
    }
}; 