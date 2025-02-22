// // src/controllers/authController.ts
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const login = (req: Request, res: Response): void => {
  const { username, password } = req.body;

  try {
    if (username === 'admin' && password === 'password') {
      const token = jwt.sign({ username }, process.env.JWT_SECRET as string);
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
