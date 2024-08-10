// server/src/models/User.ts
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // You can add more fields like name, roles, etc., depending on your needs
});

export const User = mongoose.model('User', userSchema);
