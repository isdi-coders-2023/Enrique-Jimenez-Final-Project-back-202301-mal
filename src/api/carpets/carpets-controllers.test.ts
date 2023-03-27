import { NextFunction, Request, Response } from 'express';
import {
  createCarpetController,
  getCarpetsController,
} from './carpets-controllers';
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

describe('Given a getRobotsController function from robotsController', () => {
  const request = {} as Request;
  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Partial<Response>;

  const carpet = [
    {
      _id: '6421d273c031cfb388acbd94',
      name: 'Flowers&Leaves',
      thumb:
        'https://uqepswrzhdalcfakmxxg.supabase.co/storage/v1/object/public/carpetsthumbs/Flowers&Leaves.png',
      price: '120 €',
    },
  ];

  test('when it is invoked it should return a list of robots', async () => {
    CarpetModel.find = jest.fn().mockImplementation(() => ({
      exec: jest.fn().mockResolvedValue(carpet),
    }));
    await getCarpetsController(request, response as Response, jest.fn());
    expect(response.json).toHaveBeenCalledWith(carpet);
  });

  test('when the database throws an error then it should response with status 500', async () => {
    const next = jest.fn();
    CarpetModel.find = jest.fn().mockImplementation(() => ({
      exec: jest.fn().mockRejectedValue(new Error('Something went wrong')),
    }));
    await getCarpetsController(request, response as Response, next);
    expect(next).toHaveBeenCalled();
  });
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
