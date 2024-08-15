import mongoose, { Document, Schema } from 'mongoose';

export interface Milestone {
    title: string;
    dueDate: Date;
    completed: boolean;
}

export interface IGoal extends Document {
    title: string;
    description?: string;
    targetDate: Date;
    completed: boolean;
    milestones: Milestone[];
    user: mongoose.Schema.Types.ObjectId;
}

const goalSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    targetDate: {
        type: Date,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    milestones: [
        {
            title: String,
            dueDate: Date,
            completed: Boolean,
        },
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });

const Goal = mongoose.model<IGoal>('Goal', goalSchema);

export default Goal;
