import express from 'express';
import { protect, AuthRequest } from '../middleware/authMiddleware';
import { Task } from '../models/task';

const router = express.Router();

// Create a new task
router.post('/', protect, async (req: AuthRequest, res) => {
    try {
        const { title, description, targetDate } = req.body;
        const task = new Task({
            title,
            description,
            targetDate,
            completed: false,
            user: req.user!._id,  // Reference to the authenticated user
        });
        const createdTask = await task.save();
        res.status(201).json(createdTask);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all tasks for the authenticated user
router.get('/', protect, async (req: AuthRequest, res) => {
    try {
        const tasks = await Task.find({ user: req.user!._id });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Update a task
router.put('/:id', protect, async (req: AuthRequest, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (task && task.user.equals(req.user!._id)) {
            task.title = req.body.title || task.title;
            task.description = req.body.description || task.description;
            task.targetDate = req.body.targetDate || task.targetDate;
            task.completed = req.body.completed !== undefined ? req.body.completed : task.completed;
            const updatedTask = await task.save();
            res.json(updatedTask);
        } else {
            res.status(404).json({ message: 'Task not found or unauthorized' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete a task
router.delete('/:id', protect, async (req: AuthRequest, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (task && task.user.equals(req.user!._id)) {
            await task.deleteOne();
            res.json({ message: 'Task removed' });
        } else {
            res.status(404).json({ message: 'Task not found or unauthorized' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
