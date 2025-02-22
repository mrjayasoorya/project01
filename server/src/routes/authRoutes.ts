// src/routes/authRoutes.ts
import express, { Router, Request, Response } from 'express';

// import { Router } from 'express';
import { login } from '@controllers/authController';

const router: Router = express.Router();
// const router = Router();

// Use the login function as a route handler
router.post('/login', login);

export default router;