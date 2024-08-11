import express from 'express';
import { protect, AuthRequest } from '../middleware/authMiddleware';
import User from '../models/user';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';  // Import Types from mongoose

// Generate a JWT token
const generateToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET!, {
        expiresIn: '30d',
    });
};

const router = express.Router();

// Login Route
router.post(
    '/login',
    asyncHandler(async (req: AuthRequest, res: express.Response): Promise<void> => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user || !(await user.matchPassword(password))) {
                res.status(401).json({ message: 'Invalid email or password' });
                return;
            }

            // Ensure user._id is treated as a string
            const userId = (user._id as Types.ObjectId).toString();

            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(userId),
            });
        } catch (err) {
            const error = err as Error;
            res.status(500).json({ message: error.message });
        }
    })
);

// Register Route
router.post(
    '/register',
    asyncHandler(async (req: AuthRequest, res: express.Response): Promise<void> => {
        try {
            const { name, email, password } = req.body;
            const userExists = await User.findOne({ email });

            if (userExists) {
                res.status(400).json({ message: 'User already exists' });
                return;
            }

            const user = await User.create({
                name,
                email,
                password,
            });

            if (user) {
                // Ensure user._id is treated as a string
                const userId = (user._id as Types.ObjectId).toString();

                res.status(201).json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    token: generateToken(userId),
                });
            } else {
                res.status(400).json({ message: 'Invalid user data' });
            }
        } catch (err) {
            const error = err as Error;
            res.status(500).json({ message: error.message });
        }
    })
);

// Profile Route (protected)
router.get(
    '/profile',
    protect,
    asyncHandler(async (req: AuthRequest, res: express.Response): Promise<void> => {
        const user = req.user;
        res.json(user);
    })
);

export default router;
