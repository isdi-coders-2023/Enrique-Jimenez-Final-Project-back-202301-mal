import { RequestHandler } from 'express';
import log from '../../logger.js';
import { Carpet, CarpetModel } from './carpets-schema.js';

export const createCarpetController: RequestHandler<
  unknown,
  unknown,
  Carpet
> = async (req, res, next) => {
  const { name, thumb, price, width, height } = req.body;
  try {
    const createCarpet: Carpet = {
      name,
      thumb,
      price,
      width,
      height,
    };

    await CarpetModel.create(createCarpet);
    log.info('New carpet created');
    return res
      .status(201)
      .json({ msg: 'Tu alfombra se ha tejido correctamente' });
  } catch (err) {
    next(err);
  }
};
