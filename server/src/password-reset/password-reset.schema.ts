import * as mongoose from 'mongoose';

export const PasswordResetSchema = new mongoose.Schema({
    token: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    createdAt: {
      type: Number,
      required: true
    }
  });