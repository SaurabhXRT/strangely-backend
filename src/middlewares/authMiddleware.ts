import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface AuthRequest extends Request {
    user?: { user_id: number };
}

export const authMiddleware = (req: any, res: any, next: NextFunction) => {
    const token = req.header("Authorization")?.split(" ")[1]; 

    if (!token) {
        return res.status(401).json({ 
            message: "Access denied. No token provided." 
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { user_id: number }; 
        req.user = { user_id: decoded.user_id }; 
        next();
    } catch (error) {
        return res.status(403).json({ 
            message: "Invalid or expired token." 
        });
    }
};
