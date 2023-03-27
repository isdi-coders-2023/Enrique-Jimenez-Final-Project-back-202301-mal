import mongoose, { Schema } from 'mongoose';

export interface Carpet {
  name: string;
  thumb: string;
  price: string;
  width: number;
  height: number;
}

const carpetSchema = new Schema<Carpet>({
  name: String,
  thumb: String,
  price: String,
  width: Number,
  height: Number,
});

export const CarpetModel = mongoose.model<Carpet>(
  'Carpet',
  carpetSchema,
  'carpets',
);
