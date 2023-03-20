import { NextFunction, Request, Response } from 'express';
import { createCarpetController } from './carpets-controllers';
import { CarpetModel } from './carpets-schema';

jest.mock('@supabase/supabase-js', () => {
  const data = {
    publicUrl: 'https://example.com/photo.png',
  };
  return {
    createClient: jest.fn().mockImplementation(() => ({
      storage: {
        from: jest.fn().mockReturnValue({
          upload: jest.fn().mockResolvedValue({
            error: null,
            data: {
              ...data,
            },
          }),
          getPublicUrl: jest.fn().mockReturnValue({
            error: null,
            data: {
              ...data,
            },
          }),
        }),
      },
    })),
  };
});

describe('Given a create carpets controller', () => {
  const next = jest.fn();

  const regRequest = {
    body: { name: 'mockedName', price: 99, width: 90, height: 150 },
    file: { buffer: Buffer.from('mockedBuffer') },
  } as Partial<Request>;

  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Partial<Response>;

  const mockPost = { _id: 'post_id' };
  CarpetModel.create = jest.fn().mockResolvedValue(mockPost);

  test('Then the post should be created', async () => {
    await createCarpetController(
      regRequest as Request,
      response as Response,
      next as NextFunction,
    );
    await expect(response.status).toHaveBeenCalledWith(201);
  });
  test('But there is an error, then an error should be thrown', async () => {
    CarpetModel.create = jest
      .fn()
      .mockRejectedValueOnce(new Error('test error'));
    await createCarpetController(
      regRequest as Request,
      response as Response,
      next,
    );
    await expect(next).toHaveBeenCalled();
  });
});
