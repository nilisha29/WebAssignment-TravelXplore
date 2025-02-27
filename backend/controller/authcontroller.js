import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/usersmodel.js';
import { UserProfile } from '../models/userprofilemodel.js'; // Import the UserProfile model

// backend/controller/authController.js
const signup = async (req, res) => {
    const { fullName, email, password, isAdmin } = req.body;

    // Validate input
    if (!fullName || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ fullName, email, password: hashedPassword, isAdmin });

        // Create a user profile
        const newUserProfile = await UserProfile.create({ userId: newUser.id, fullName, email });

        res.status(201).json({ message: "User created successfully", user: newUser, userProfile: newUserProfile });
    } catch (error) {
        res.status(500).json({ error: "Failed to create user" });
    }
};

const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password" });
        }

        const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, userId: user.id, isAdmin: user.isAdmin });
    } catch (error) {
        res.status(500).json({ error: "Failed to sign in" });
    }
};


export const authController = {
    signup,
    signin
};