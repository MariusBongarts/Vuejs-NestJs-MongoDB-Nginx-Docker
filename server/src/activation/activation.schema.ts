import * as mongoose from 'mongoose';

export const ActivationSchema = new mongoose.Schema({
    token: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
      type: String,
      required: true
    },
    createdAt: {
      type: Number,
      required: true
    }
  });