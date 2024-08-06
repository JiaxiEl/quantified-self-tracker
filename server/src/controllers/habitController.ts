import { Request, Response } from 'express';
import Habit from '../models/Habit';

interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
    };
}

export const createHabit = async (req: AuthenticatedRequest, res: Response) => {
    const { title, description, frequency } = req.body;
    try {
        const newHabit = new Habit({ userId: req.user?.id, title, description, frequency });
        await newHabit.save();
        res.status(201).json(newHabit);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

export const getHabits = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const habits = await Habit.find({ userId: req.user?.id });
        res.json(habits);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

export const updateHabit = async (req: AuthenticatedRequest, res: Response) => {
    const { habitId, title, description, frequency } = req.body;
    try {
        const habit = await Habit.findById(habitId);
        if (!habit || habit.userId.toString() !== req.user?.id) {
            return res.status(404).json({ message: 'Habit not found' });
        }

        habit.title = title || habit.title;
        habit.description = description || habit.description;
        habit.frequency = frequency || habit.frequency;
        await habit.save();

        res.json(habit);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

export const deleteHabit = async (req: AuthenticatedRequest, res: Response) => {
    const { habitId } = req.body;
    try {
        const habit = await Habit.findById(habitId);
        if (!habit || habit.userId.toString() !== req.user?.id) {
            return res.status(404).json({ message: 'Habit not found' });
        }

        await habit.remove();
        res.json({ message: 'Habit deleted' });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};
