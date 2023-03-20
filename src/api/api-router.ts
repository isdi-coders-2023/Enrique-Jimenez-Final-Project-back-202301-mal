import express from 'express';
import carpetsRouter from './carpets/carpets-router.js';

const router = express.Router();

router.use('/carpets', carpetsRouter);

export default router;
