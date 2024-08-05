import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './src/routes/authRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI as string;
const JWT_SECRET = process.env.JWT_SECRET;

if (!MONGO_URI) {
    throw new Error('MONGO_URI is not defined in the environment variables');
}

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the environment variables');
}

app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
