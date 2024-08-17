import express from 'express';
import { AuthRequest, protect } from '../middleware/authMiddleware';
import Goal from '../models/goal';

const router = express.Router();

// Get all goals for the authenticated user
router.get('/', protect, async (req: AuthRequest, res) => {
    try {
        const goals = await Goal.find({ user: req.user!._id });
        res.json(goals);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

// Create a new goal
router.post('/', protect, async (req: AuthRequest, res) => {
    try {
        const { title, description, targetDate } = req.body;
        const goal = new Goal({
            user: req.user!._id,
            title,
            description,
            targetDate,
            completed: false,
        });
        const createdGoal = await goal.save();
        res.status(201).json(createdGoal);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

// Update a goal (mark as completed or update details)
router.put('/:id', protect, async (req: AuthRequest, res) => {
    try {
        const goal = await Goal.findById(req.params.id);
        if (goal && String(goal.user) === String(req.user!._id)) {
            goal.title = req.body.title || goal.title;
            goal.description = req.body.description || goal.description;
            goal.targetDate = req.body.targetDate || goal.targetDate;
            goal.completed = req.body.completed !== undefined ? req.body.completed : goal.completed;
            const updatedGoal = await goal.save();
            res.json(updatedGoal);
        } else {
            res.status(404).json({ message: 'Goal not found' });
        }
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

// Mark a goal as completed
router.patch('/:id/complete', protect, async (req: AuthRequest, res) => {
    try {
        const goal = await Goal.findById(req.params.id);
        if (goal && String(goal.user) === String(req.user!._id)) {
            goal.completed = true;
            const updatedGoal = await goal.save();
            res.json(updatedGoal);
        } else {
            res.status(404).json({ message: 'Goal not found' });
        }
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

// Delete a goal
router.delete('/:id', protect, async (req: AuthRequest, res) => {
    try {
        const goal = await Goal.findById(req.params.id);
        if (goal && String(goal.user) === String(req.user!._id)) {
            await goal.deleteOne();
            res.json({ message: 'Goal removed' });
        } else {
            res.status(404).json({ message: 'Goal not found' });
        }
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

export default router;
