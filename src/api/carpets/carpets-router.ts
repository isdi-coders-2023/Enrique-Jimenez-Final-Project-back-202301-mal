import express from 'express';
import { upload } from './capetThumb-upload-middleware.js';
import {
  createCarpetController,
  getCarpetsController,
} from './carpets-controllers.js';

const router = express.Router();

router
  .route('/create')
  .post(upload.single('thumb'), createCarpetController)
  .get(getCarpetsController);

export default router;
