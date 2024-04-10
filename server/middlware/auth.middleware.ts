import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || '';

export const authenticateToken = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers['authorization'];
  if (token == null)
    return res.status(401).json({ message: 'Authentication failed' });

  jwt.verify(token, 'secretkey', (err: any, user: any) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user.user;
    next();
  });
};
