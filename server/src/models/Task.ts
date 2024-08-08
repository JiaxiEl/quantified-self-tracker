import mongoose, { Document, Schema } from 'mongoose';

interface ITask extends Document {
    userId: mongoose.Types.ObjectId;
    title: string;
    description: string;
    completed: boolean;
}

const TaskSchema: Schema = new Schema({
    userId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    title: { type: String, required: true },
    description: { type: String, required: true },
    completed: { type: Boolean, default: false },
});

export default mongoose.model<ITask>('Task', TaskSchema);
