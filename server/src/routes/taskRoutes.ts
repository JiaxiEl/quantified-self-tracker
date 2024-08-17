import express from 'express';
import { AuthRequest, protect } from '../middleware/authMiddleware';
import { Task } from '../models/task';

const router = express.Router();

// Get all tasks for a specific goal
router.get('/:goalId', protect, async (req: AuthRequest, res) => {
    try {
        const tasks = await Task.find({ goal: req.params.goalId });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

// Create a new task for a specific goal
router.post('/:goalId', protect, async (req: AuthRequest, res) => {
    try {
        const { title, description, dueDate } = req.body;
        const task = new Task({
            goal: req.params.goalId,
            title,
            description,
            dueDate,
            completed: false,
        });
        const createdTask = await task.save();
        res.status(201).json(createdTask);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

// Update a task (mark as completed or update details)
router.put('/:taskId', protect, async (req: AuthRequest, res) => {
    try {
        const task = await Task.findById(req.params.taskId);
        if (task) {
            task.title = req.body.title || task.title;
            task.description = req.body.description || task.description;
            task.dueDate = req.body.dueDate || task.dueDate;
            task.completed = req.body.completed !== undefined ? req.body.completed : task.completed;
            const updatedTask = await task.save();
            res.json(updatedTask);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

// Delete a task
router.delete('/:taskId', protect, async (req: AuthRequest, res) => {
    try {
        const task = await Task.findById(req.params.taskId);
        if (task) {
            await task.deleteOne();
            res.json({ message: 'Task removed' });
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

export default router;
