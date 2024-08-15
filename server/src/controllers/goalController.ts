import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';  // Import the custom AuthRequest interface
import Goal from '../models/goal';

// Create a new goal
export const createGoal = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const goal = new Goal({ ...req.body, user: req.user!._id });  // Use req.user
        await goal.save();
        res.status(201).json(goal);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

// Get all goals for a user
export const getGoals = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const goals = await Goal.find({ user: req.user!._id });  // Use req.user
        res.json(goals);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

// Update an existing goal
export const updateGoal = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const goal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!goal) {
            res.status(404).json({ message: 'Goal not found' });
            return;
        }
        res.json(goal);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

// Delete a goal
export const deleteGoal = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const goal = await Goal.findByIdAndDelete(req.params.id);
        if (!goal) {
            res.status(404).json({ message: 'Goal not found' });
            return;
        }
        res.json({ message: 'Goal deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};
