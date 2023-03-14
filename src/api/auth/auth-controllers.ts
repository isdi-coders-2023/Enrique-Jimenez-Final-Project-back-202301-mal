import { RequestHandler } from 'express';
import log from '../../logger.js';
import { UserModel } from '../users/user-schema.js';
import { AuthRequest, LoginResponse } from './auth-types.js';
import { encryptPassword, generateJWTToken } from './auth-utils.js';

export const loginUserController: RequestHandler<
  unknown,
  LoginResponse | { msg: string },
  AuthRequest
> = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const filterUser: AuthRequest = {
      email,
      password: encryptPassword(password),
    };
    const existingUser = await UserModel.findOne(filterUser).exec();
    if (existingUser === null) {
      log.debug(encryptPassword(password));
      return res.sendStatus(404);
    }

    const tokenJWT = generateJWTToken(email);
    return res.status(201).json({
      accessToken: tokenJWT,
    });
  } catch (err) {
    next(err);
  }
};
