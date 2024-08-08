import { Request, Response } from 'express';
import User from '../models/User';

interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
    };
}

export const getProfile = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const user = await User.findById(req.user?.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

export const updateProfile = async (req: AuthenticatedRequest, res: Response) => {
    const { username, bio } = req.body;
    try {
        const user = await User.findById(req.user?.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.username = username || user.username;
        user.bio = bio || user.bio;
        await user.save();

        res.json(user);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};
