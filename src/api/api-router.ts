import express from 'express';
import userRouter from './users/users-router.js';

const router = express.Router();

router.use('/users', userRouter);

export default router;
