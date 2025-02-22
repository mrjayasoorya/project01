// src/routes/jwtVerifyRoute.ts
import { Router } from 'express';
import { jwtVerifyMiddleware } from '../middlewares/jwtVerify';

const router = Router();

router.get('/verify-token', jwtVerifyMiddleware, (req, res) => {
  res.status(200).json({ message: 'Token is valid', user: req.user });
});

export default router;
