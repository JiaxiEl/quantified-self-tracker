import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import goalRoutes from './routes/goalRoutes';
import taskRoutes from './routes/taskRoutes';
import { protect } from './middleware/authMiddleware';
import { notFound, errorHandler } from './middleware/errorMiddleware';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/goals', protect, goalRoutes);  // Ensure this line is correct
app.use('/api/tasks', protect, taskRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI!)
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch(err => console.error(err));
