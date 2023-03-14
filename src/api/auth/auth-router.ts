import express from 'express';

import bodyParser from 'body-parser';
import { validate } from 'express-validation';
import { loginValidation } from './auth-types.js';
import { loginUserController } from './auth-controllers.js';

const authRouter = express.Router();

const app = express();
app.use(bodyParser.json());

authRouter.route('/register');
authRouter
  .route('/login')
  .post(validate(loginValidation, {}, {}), loginUserController);

export default authRouter;
