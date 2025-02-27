import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from 'path';
import userRoutes from "./route/usersroute.js";
import contactRoutes from "./route/contactroute.js";
import authRoutes from "./route/authroute.js";
import bookingRoutes from "./route/bookingroute.js"; // Import booking routes
import reviewRoutes from './route/reviewroute.js';
import { fileURLToPath } from 'url';
import { sequelize, testConnection } from './database/db.js';
import { authenticateToken } from './middleware/authMiddleware.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 5000;
dotenv.config();

// Middleware
app.use(cors({
    origin: `http://localhost:5174`,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Test route
app.get('/login', (req, res) => {
    res.send("Welcome to the web page");
});


// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Set up routes for users
app.use('/users', authenticateToken, userRoutes);

// Set up routes for contact
app.use('/contact', contactRoutes);

// Set up routes for auth
app.use('/auth', authRoutes);

// Set up routes for booking
app.use('/booking', bookingRoutes); // Use booking routes with the prefix '/booking'

// Review routes
app.use('/reviews', reviewRoutes);

// Test database connection
sequelize.authenticate()
    .then(() => {
        console.log('Database connected...');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// Sync database
sequelize.sync()
    .then(() => {
        console.log('Database synced...');
    })
    .catch(err => {
        console.error('Unable to sync the database:', err);
    });

// Start the server
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Server is shutting down...');
  server.close(() => {
    process.exit(0);
  });
});

export default app;