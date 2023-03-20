import mongoose, { Schema } from 'mongoose';

export interface Carpet {
  name: string;
  thumb: string;
  price: number;
  width: number;
  height: number;
}

const carpetSchema = new Schema<Carpet>({
  name: String,
  thumb: String,
  price: Number,
  width: Number,
  height: Number,
});

export const CarpetModel = mongoose.model<Carpet>(
  'Carpet',
  carpetSchema,
  'carpets',
);
