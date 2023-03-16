import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'express-validation';
import { CustomHTTPError } from '../errors/custom-http-error.js';
import log from '../logger.js';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof ValidationError) {
    log.error(err);
    return res.status(err.statusCode).json(err);
  }

  if (err instanceof CustomHTTPError) {
    log.error(err);
    return res.status(err.httpCode).json(err.message);
  }

  log.error(err);
  return res.status(500).json(err.message);
};
