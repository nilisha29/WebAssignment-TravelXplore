import Destination from '../models/Destination.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { Op } from 'sequelize';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get all destinations with basic information
export const getAllDestinations = async (req, res) => {
    try {
        const destinations = await Destination.findAll({
            attributes: ['name', 'shortDescription', 'basePrice', 'mainImage', 'urlSlug']
        });
        res.status(200).json(destinations);
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
        res.status(200).json(destination);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching destination', error: error.message });
    }
};

// Create a new destination
export const createDestination = async (req, res) => {
    try {
        // Handle the multipart form data
        const destinationData = {
            name: req.body.name,
            shortDescription: req.body.shortDescription,
            basePrice: parseFloat(req.body.basePrice),
            mainImage: req.files.mainImage ? req.files.mainImage[0].filename : null,
            destinationDetailImages: {
                image1: req.files.detailImage1 ? req.files.detailImage1[0].filename : null,
                image2: req.files.detailImage2 ? req.files.detailImage2[0].filename : null
            },
            detailedDescription: JSON.parse(req.body.detailedDescription || '[]'),
            flightInformation: JSON.parse(req.body.flightInformation || '{}')
        };

        // Create new destination - urlSlug will be auto-generated
        const destination = await Destination.create(destinationData);

        res.status(201).json({
            destination,
            message: `Destination created successfully with URL slug: ${destination.urlSlug}`
        });
    } catch (error) {
        // Clean up uploaded files if there's an error
        if (req.files) {
            Object.values(req.files).forEach(async (fileArray) => {
                await fs.unlink(path.join('uploads/destinations/', fileArray[0].filename))
                    .catch(err => console.error('Error deleting file:', err));
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
        // Get the existing destination to handle image cleanup
        const existingDestination = await Destination.findOne({
            where: { urlSlug: req.params.slug }
        });
        
        if (!existingDestination) {
            return res.status(404).json({ message: 'Destination not found' });
        }

        // Handle the multipart form data
        const updateData = {
            name: req.body.name,
            shortDescription: req.body.shortDescription,
            basePrice: req.body.basePrice ? parseFloat(req.body.basePrice) : undefined,
            detailedDescription: req.body.detailedDescription ? JSON.parse(req.body.detailedDescription) : undefined,
            flightInformation: req.body.flightInformation ? JSON.parse(req.body.flightInformation) : undefined
        };

        // Update images if new ones are provided
        if (req.files.mainImage) {
            updateData.mainImage = req.files.mainImage[0].filename;
            // Delete old main image
            if (existingDestination.mainImage) {
                await fs.unlink(path.join('uploads/destinations/', existingDestination.mainImage))
                    .catch(err => console.error('Error deleting old main image:', err));
            }
        }

        if (req.files.detailImage1 || req.files.detailImage2) {
            updateData.destinationDetailImages = {
                ...existingDestination.destinationDetailImages,
                image1: req.files.detailImage1 ? req.files.detailImage1[0].filename : existingDestination.destinationDetailImages.image1,
                image2: req.files.detailImage2 ? req.files.detailImage2[0].filename : existingDestination.destinationDetailImages.image2
            };

            // Delete old detail images
            if (req.files.detailImage1 && existingDestination.destinationDetailImages.image1) {
                await fs.unlink(path.join('uploads/destinations/', existingDestination.destinationDetailImages.image1))
                    .catch(err => console.error('Error deleting old detail image 1:', err));
            }
            if (req.files.detailImage2 && existingDestination.destinationDetailImages.image2) {
                await fs.unlink(path.join('uploads/destinations/', existingDestination.destinationDetailImages.image2))
                    .catch(err => console.error('Error deleting old detail image 2:', err));
            }
        }

        // Update the destination
        await existingDestination.update(updateData);

        res.status(200).json({
            message: 'Destination updated successfully',
            destination: existingDestination
        });
    } catch (error) {
        // Clean up any newly uploaded files if there's an error
        if (req.files) {
            Object.values(req.files).forEach(async (fileArray) => {
                await fs.unlink(path.join('uploads/destinations/', fileArray[0].filename))
                    .catch(err => console.error('Error deleting file:', err));
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

        // Delete associated images
        if (destination.mainImage) {
            await fs.unlink(path.join('uploads/destinations/', destination.mainImage))
                .catch(err => console.error('Error deleting main image:', err));
        }

        if (destination.destinationDetailImages) {
            if (destination.destinationDetailImages.image1) {
                await fs.unlink(path.join('uploads/destinations/', destination.destinationDetailImages.image1))
                    .catch(err => console.error('Error deleting detail image 1:', err));
            }
            if (destination.destinationDetailImages.image2) {
                await fs.unlink(path.join('uploads/destinations/', destination.destinationDetailImages.image2))
                    .catch(err => console.error('Error deleting detail image 2:', err));
            }
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
        res.status(200).json(destinations);
    } catch (error) {
        res.status(500).json({ message: 'Error searching destinations', error: error.message });
    }
}; 