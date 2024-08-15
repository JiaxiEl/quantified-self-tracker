import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User, IUser } from '../models/user';

export interface AuthRequest extends Request {
    user?: IUser;  // Extend the Request interface with the user property
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

            // Get user from the token
            const user = await User.findById(decoded.id).select('-password');
            if (!user) {
                res.status(401);
                throw new Error('User not found');
            }
            req.user = user;

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};
