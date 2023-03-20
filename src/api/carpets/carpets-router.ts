import express from 'express';
import { createCarpetController } from './carpets-controllers.js';

const router = express.Router();

router.route('/create').post(createCarpetController);

export default router;
