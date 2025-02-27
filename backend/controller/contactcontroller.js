import { Contact } from '../models/contactmodel.js'; // Import the Contact model

const submitContactForm = async (req, res) => {
    try {
        const { fullName, email, message } = req.body;

        if (!fullName || !email || !message) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Save the contact form data to the database
        const newContact = await Contact.create({
            fullName,
            email,
            message
        });

        res.status(201).json({ data: newContact, message: "Contact form submitted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to submit contact form" });
    }
};

const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.findAll();
        res.status(200).json(contacts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to retrieve contacts" });
    }
};

export const contactController = {
    submitContactForm,
    getAllContacts
};