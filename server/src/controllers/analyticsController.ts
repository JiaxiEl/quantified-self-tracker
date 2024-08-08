import { Request, Response } from 'express';
import Task from '../models/Task';
import Habit from '../models/Habit';
import Goal from '../models/Goal';

interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
    };
}

export const getAnalytics = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.id;

        // Fetch completed tasks, habits, and goals
        const tasks = await Task.find({ userId, completed: true });
        const habits = await Habit.find({ userId });
        const goals = await Goal.find({ userId, completed: true });

        if (!tasks.length && !habits.length && !goals.length) {
            return res.json({ dates: [], completedTasks: [], completedHabits: [], completedGoals: [] });
        }

        // For simplicity, using mock data for dates
        const analyticsData = {
            dates: ['2024-01-01', '2024-02-01', '2024-03-01', '2024-04-01'],
            completedTasks: [tasks.length > 0 ? tasks.length : 0],
            completedHabits: [habits.length > 0 ? habits.length : 0],
            completedGoals: [goals.length > 0 ? goals.length : 0],
        };

        res.json(analyticsData);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};
