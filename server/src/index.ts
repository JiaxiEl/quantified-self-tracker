import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file in the root directory
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Ensure MONGODB_URI is defined
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
    console.error('MONGODB_URI is not defined in .env file');
    process.exit(1);  // Exit the process with an error code
}

// Connect to MongoDB
mongoose.connect(mongoUri)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);  // Exit the process if the connection fails
    });

// Routes
import authRoutes from './routes/authRoutes';
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
