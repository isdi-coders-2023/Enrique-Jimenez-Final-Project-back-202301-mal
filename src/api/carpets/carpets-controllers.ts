import { RequestHandler } from 'express';
import {
  PROFILE_BUCKET_NAME,
  supabase,
} from '../../database/supabase-client.js';
import log from '../../logger.js';
import { Carpet, CarpetModel } from './carpets-schema.js';

export const createCarpetController: RequestHandler<
  unknown,
  unknown,
  Carpet
> = async (req, res, next) => {
  const { name, price, width, height } = req.body;

  try {
    const fileBuffer = req.file?.buffer;
    if (fileBuffer !== undefined) {
      const fileName = `${name}.png`;
      const { error } = await supabase.storage
        .from(PROFILE_BUCKET_NAME)
        .upload(fileName, fileBuffer);

      if (error === null) {
        const { data } = supabase.storage
          .from(PROFILE_BUCKET_NAME)
          .getPublicUrl(fileName);

        const createCarpet: Carpet = {
          name,
          thumb: data.publicUrl,
          price,
          width,
          height,
        };

        await CarpetModel.create(createCarpet);
        log.info('New carpet created');
        return res
          .status(201)
          .json({ msg: 'Tu alfombra se ha tejido correctamente' });
      }
    }
  } catch (err) {
    next(err);
  }
};
