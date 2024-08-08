import mongoose, { Document, Schema } from 'mongoose';

interface IHabit extends Document {
    userId: mongoose.Types.ObjectId;
    title: string;
    description: string;
    frequency: string; // e.g., "daily", "weekly"
}

const HabitSchema: Schema = new Schema({
    userId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    title: { type: String, required: true },
    description: { type: String, required: true },
    frequency: { type: String, required: true },
});

export default mongoose.model<IHabit>('Habit', HabitSchema);
