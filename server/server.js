import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';

const app = express();

// Middleware
app.use(cors());  // Enable Cross-Origin Resource Sharing (CORS)
app.use(express.json());  // Parse incoming JSON requests

// Routes
app.use('/api/auth', authRoutes);  // Use the authentication routes with the /api/auth prefix

// Server Configuration
const PORT = process.env.PORT || 5000;  // Use port 5000 or the port defined in environment variables
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));  // Start the server
