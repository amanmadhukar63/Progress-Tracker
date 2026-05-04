import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  emailVerified: Boolean;
  otp: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  refreshToken: string;
}