// src/middlewares/jwtVerify.ts
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwtUtils';

export const jwtVerifyMiddleware = (req: Request, res: Response, next: NextFunction) : void => {
  const token : string = req.headers.authorization?.split(' ')[1] || "";
  if (!token) {
    res.status(401).json({ message: 'No token provided' });
  }
  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    
    res.status(401).json({ message: 'Invalid token' });
  }
};