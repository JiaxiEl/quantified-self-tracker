import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for a Task document
export interface ITask extends Document {
    title: string;
    description: string;
    targetDate: Date;
    completed: boolean;
    user: mongoose.Types.ObjectId;  // Reference to the User model
}

// Create the schema for a Task document
const TaskSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    targetDate: { type: Date, required: true },
    completed: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // User reference
});

// Export the Task model
export const Task = mongoose.model<ITask>('Task', TaskSchema);
