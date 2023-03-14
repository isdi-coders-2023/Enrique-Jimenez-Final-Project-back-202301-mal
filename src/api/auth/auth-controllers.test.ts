import { NextFunction, Request, Response } from 'express';
import { loginUserController } from './auth-controllers';
import dotenv from 'dotenv';
import { UserModel } from '../users/user-schema';
dotenv.config();

const request = {
  body: {
    email: 'mock@email.com',
    password: 'mockedPassword',
  },
} as Partial<Request>;
const response = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as Partial<Response>;
const next = jest.fn();

const OLD_ENV = process.env;
beforeEach(() => {
  jest.resetModules();
  process.env = { ...OLD_ENV };
});
afterAll(() => {
  process.env = OLD_ENV;
});

UserModel.findOne = jest.fn().mockReturnValue({
  exec: jest.fn().mockResolvedValue(null),
});

describe('Given a login controller', () => {
  test('When the json web token secret environment variable does not exist, then the response should be an error', async () => {
    delete process.env.JWT_SECRET;
    await loginUserController(
      request as Request,
      response as Response,
      next as NextFunction,
    );
    expect(next).toHaveBeenCalled();
  });

  test('When the user tries to login with a valid account, then his token should be generated', async () => {
    UserModel.findOne = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(1),
    });
    await loginUserController(
      request as Request,
      response as Response,
      jest.fn(),
    );
    expect(response.status).toHaveBeenCalledWith(201);
  });
});
