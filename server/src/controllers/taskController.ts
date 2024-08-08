import { Request, Response } from 'express';
import Task from '../models/Task';

interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
    };
}

export const createTask = async (req: AuthenticatedRequest, res: Response) => {
    const { title, description } = req.body;
    try {
        const newTask = new Task({ userId: req.user?.id, title, description });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

export const getTasks = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const tasks = await Task.find({ userId: req.user?.id });
        res.json(tasks);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

export const updateTask = async (req: AuthenticatedRequest, res: Response) => {
    const { taskId, title, description, completed } = req.body;
    try {
        const task = await Task.findById(taskId);
        if (!task || task.userId.toString() !== req.user?.id) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.completed = completed !== undefined ? completed : task.completed;
        await task.save();

        res.json(task);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

export const deleteTask = async (req: AuthenticatedRequest, res: Response) => {
    const { taskId } = req.body;
    try {
        const task = await Task.findById(taskId);
        if (!task || task.userId.toString() !== req.user?.id) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await task.remove();
        res.json({ message: 'Task deleted' });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};
