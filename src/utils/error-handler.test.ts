import { Request, Response } from 'express';
import { ValidationError } from 'express-validation';

import { errorHandler } from './error-handler';

describe('errorHandler', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  const nextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
    };
  });

  test('should handle ValidationError', () => {
    const mockError = new ValidationError({}, { statusCode: 400 });
    const expectedResponse = {
      statusCode: 400,
      message: 'Validation Error',
      error: mockError.details,
    };

    errorHandler(
      mockError,
      mockRequest as Request,
      mockResponse as Response,
      nextFunction,
    );

    expect(mockResponse.status).toHaveBeenCalledWith(
      expectedResponse.statusCode,
    );
    expect(nextFunction).not.toHaveBeenCalled();
  });

  test('should return a 500 status code and an error message if the error is not a validation error', () => {
    const mockError = new Error('An error occurred');
    errorHandler(
      mockError,
      mockRequest as Request,
      mockResponse as Response,
      nextFunction,
    );
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      msg: 'An error occurred',
    });
  });
});
