import express from 'express';
import { upload } from './capetThumb-upload-middleware.js';
import { createCarpetController } from './carpets-controllers.js';

const router = express.Router();

router.route('/create').post(upload.single('thumb'), createCarpetController);

export default router;
