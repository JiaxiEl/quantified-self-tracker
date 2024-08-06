import { Request, Response } from 'express';
import Goal from '../models/Goal';

interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
    };
}

export const createGoal = async (req: AuthenticatedRequest, res: Response) => {
    const { title, description, targetDate } = req.body;
    try {
        const newGoal = new Goal({ userId: req.user?.id, title, description, targetDate });
        await newGoal.save();
        res.status(201).json(newGoal);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

export const getGoals = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const goals = await Goal.find({ userId: req.user?.id });
        res.json(goals);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

export const updateGoal = async (req: AuthenticatedRequest, res: Response) => {
    const { goalId, title, description, targetDate, completed } = req.body;
    try {
        const goal = await Goal.findById(goalId);
        if (!goal || goal.userId.toString() !== req.user?.id) {
            return res.status(404).json({ message: 'Goal not found' });
        }

        goal.title = title || goal.title;
        goal.description = description || goal.description;
        goal.targetDate = targetDate || goal.targetDate;
        goal.completed = completed !== undefined ? completed : goal.completed;
        await goal.save();

        res.json(goal);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

export const deleteGoal = async (req: AuthenticatedRequest, res: Response) => {
    const { goalId } = req.body;
    try {
        const goal = await Goal.findById(goalId);
        if (!goal || goal.userId.toString() !== req.user?.id) {
            return res.status(404).json({ message: 'Goal not found' });
        }

        await goal.remove();
        res.json({ message: 'Goal deleted' });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};
