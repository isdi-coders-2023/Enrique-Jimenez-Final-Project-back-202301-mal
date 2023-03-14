import express from 'express';

import { validate } from 'express-validation';
import { loginValidation } from './auth-types.js';
import { loginUserController } from './auth-controllers.js';
import { errorHandler } from '../../utils/error-handler.js';

const authRouter = express.Router();

authRouter.use(validate(loginValidation));

authRouter.route('/register');
authRouter.route('/login').post(errorHandler, loginUserController);

export default authRouter;
