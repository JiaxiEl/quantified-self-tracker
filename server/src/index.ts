// server/src/index.ts
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI!, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((error) => {
        console.error('Database connection failed:', error.message);
    });

app.use('/api/user', authRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});
