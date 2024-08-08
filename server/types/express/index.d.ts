import { JwtPayload } from 'jsonwebtoken';

interface CustomJwtPayload extends JwtPayload {
    id: string;
}

declare module 'express-serve-static-core' {
    interface Request {
        user?: CustomJwtPayload;
    }
}
