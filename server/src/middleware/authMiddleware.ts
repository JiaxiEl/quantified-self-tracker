import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { User, IUser } from '../models/user';

export interface AuthRequest extends Request {
    user?: IUser;  // Specify the correct type for the user property
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    let token: string | undefined;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;

            const user = await User.findById(decoded.userId).select('-password');

            if (!user) {
                res.status(401).json({ message: 'User not found' });
                return;
            }

            req.user = user;
            next();
        } catch (error) {
            console.error('JWT verification failed:', error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};
;
