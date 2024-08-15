import mongoose, { Document, Schema } from 'mongoose';

export interface IGoal extends Document {
    user: mongoose.Schema.Types.ObjectId;
    title: string;
    description?: string;
    targetDate: Date;
    completed: boolean;
}

const goalSchema = new Schema<IGoal>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    targetDate: { type: Date, required: true },
    completed: { type: Boolean, default: false },
});

const Goal = mongoose.model<IGoal>('Goal', goalSchema);

export default Goal;
