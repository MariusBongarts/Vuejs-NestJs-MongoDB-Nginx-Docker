import * as mongoose from 'mongoose';

export const LogSchema = new mongoose.Schema({
    email: String,
    url: String,
    createdAt: Number,
    _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});
