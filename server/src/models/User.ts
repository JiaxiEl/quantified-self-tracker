import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Ensure email is unique
    password: { type: String, required: true },
    username: { type: String, unique: true, sparse: true }, // Ensure username uniqueness if used
});


export const User = mongoose.model('User', UserSchema);
