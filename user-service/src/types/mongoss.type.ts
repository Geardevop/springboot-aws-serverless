import mongoose from "mongoose";
export interface User {
    username: string;
    password: string;
    email: string;
  }
  
export interface UserDocument extends User, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
    _doc?: any
}