import mongoose, { Schema } from 'mongoose';

export interface User {
  email: string;
  password: string;
  phone: number;
  firstName: string;
  surName: string;
  profileImg: string;
}

const userSchema = new Schema<User>({
  email: String,
  password: String,
  phone: Number,
  firstName: String,
  surName: String,
  profileImg: String,
});

export const UserModel = mongoose.model<User>('User', userSchema, 'users');
