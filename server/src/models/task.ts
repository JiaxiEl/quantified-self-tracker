import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
    goal: mongoose.Types.ObjectId;
    title: string;
    description: string;
    dueDate: Date;
    completed: boolean;
}

const TaskSchema: Schema = new Schema({
    goal: { type: Schema.Types.ObjectId, ref: 'Goal', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    completed: { type: Boolean, default: false },
});

export const Task = mongoose.model<ITask>('Task', TaskSchema);
