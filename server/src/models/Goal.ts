import mongoose, { Document, Schema } from 'mongoose';

interface IGoal extends Document {
    userId: mongoose.Types.ObjectId;
    title: string;
    description: string;
    targetDate: Date;
    completed: boolean;
}

const GoalSchema: Schema = new Schema({
    userId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    title: { type: String, required: true },
    description: { type: String, required: true },
    targetDate: { type: Date, required: true },
    completed: { type: Boolean, default: false },
});

export default mongoose.model<IGoal>('Goal', GoalSchema);
