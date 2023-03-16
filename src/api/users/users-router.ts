import express from 'express';
import { validate } from 'express-validation';
import { loginValidation } from '../auth/auth-types.js';

const router = express.Router();

router.use(validate(loginValidation));

router.route('/:id');

export default router;
