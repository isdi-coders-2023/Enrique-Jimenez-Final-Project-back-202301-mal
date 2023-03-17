import { RequestHandler } from 'express';
import { CustomHTTPError } from '../../errors/custom-http-error.js';
import log from '../../logger.js';
import { User, UserModel } from '../users/user-schema.js';
import { AuthRequest, LoginResponse, RegRequest } from './auth-types.js';
import { encryptPassword, generateJWTToken } from './auth-utils.js';

export const registerController: RequestHandler<
  unknown,
  unknown,
  RegRequest
> = async (req, res, next) => {
  const { email, password, firstName, surName } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email }).exec();
    if (existingUser !== null) {
      log.error('This email is already registered');
      throw new CustomHTTPError(409, 'Ya existe un usuario con este e-mail');
    }

    const registerUser: User = {
      email,
      password: encryptPassword(password),
      phone: '',
      firstName,
      surName,
      profileImg: '',
    };

    await UserModel.create(registerUser);
    log.info('New user created');
    return res
      .status(201)
      .json({ msg: 'El usuario se ha creado correctamente' });
  } catch (err) {
    next(err);
  }
};

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
      log.error('User not found.');
      throw new CustomHTTPError(404, 'El usuario o contraseña son incorrectos');
    }

    const tokenJWT = generateJWTToken(email);
    return res.status(201).json({
      accessToken: tokenJWT,
    });
  } catch (err) {
    next(err);
  }
};
