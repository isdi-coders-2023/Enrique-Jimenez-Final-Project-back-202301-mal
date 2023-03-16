import express from 'express';

import { validate } from 'express-validation';
import { loginValidation } from './auth-types.js';
import { loginUserController, registerController } from './auth-controllers.js';
import { errorHandler } from '../../utils/error-handler.js';

const authRouter = express.Router();

authRouter.use(validate(loginValidation));

authRouter.route('/register').post(errorHandler, registerController);
authRouter.route('/login').post(errorHandler, loginUserController);

export default authRouter;
