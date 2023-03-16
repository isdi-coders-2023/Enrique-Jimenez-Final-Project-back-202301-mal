import { Joi } from 'express-validation';
import { User } from '../users/user-schema.js';

export interface UserLocalsAuthInfo {
  email: string;
}

export interface LoginResponse {
  accessToken: string;
}

export type AuthRequest = Pick<User, 'email' | 'password'>;

export type RegRequest = Pick<
  User,
  'email' | 'password' | 'firstName' | 'surName'
>;

export const loginValidation = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
    firstName: Joi.string(),
    surName: Joi.string(),
    phone: Joi.string(),
    profileImg: Joi.string(),
  }),
};
