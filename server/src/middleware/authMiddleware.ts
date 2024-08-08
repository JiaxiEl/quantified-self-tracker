import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface CustomJwtPayload extends jwt.JwtPayload {
    id: string;
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET as string) as CustomJwtPayload;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

export default authMiddleware;
