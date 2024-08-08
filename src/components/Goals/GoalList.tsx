import React, { useState, useEffect } from 'react';
import goalService from '../../services/goalService';
import { Goal } from '../../types/Goal';

const GoalList: React.FC = () => {
    const [goals, setGoals] = useState<Goal[]>([]);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [targetDate, setTargetDate] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const goals: Goal[] = await goalService.getGoals();
                setGoals(goals);
            } catch (error) {
                setError('Failed to load goals');
            }
        };
        fetchGoals();
    }, []);

    const handleCreateGoal = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        try {
            const newGoal: Goal = await goalService.createGoal(title, description, new Date(targetDate));
            setGoals([...goals, newGoal]);
            setTitle('');
            setDescription('');
            setTargetDate('');
            setSuccess('Goal created successfully');
        } catch (error) {
            setError('Failed to create goal');
        }
    };

    const handleUpdateGoal = async (goalId: string, completed: boolean) => {
        setError(null);
        setSuccess(null);
        try {
            const updatedGoal: Goal = await goalService.updateGoal(goalId, undefined, undefined, undefined, completed);
            setGoals(goals.map(goal => goal._id === goalId ? updatedGoal : goal));
            setSuccess('Goal updated successfully');
        } catch (error) {
            setError('Failed to update goal');
        }
    };

    const handleDeleteGoal = async (goalId: string) => {
        setError(null);
        setSuccess(null);
        try {
            await goalService.deleteGoal(goalId);
            setGoals(goals.filter(goal => goal._id !== goalId));
            setSuccess('Goal deleted successfully');
        } catch (error) {
            setError('Failed to delete goal');
        }
    };

    return (
        <div>
            <h2>Goals</h2>
            <form onSubmit={handleCreateGoal}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                />
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                />
                <input
                    type="date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    placeholder="Target Date"
                />
                <button type="submit">Create Goal</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <ul>
                {goals.map(goal => (
                    <li key={goal._id}>
                        <span>{goal.title}</span>
                        <span>{goal.description}</span>
                        <span>{new Date(goal.targetDate).toLocaleDateString()}</span>
                        <button onClick={() => handleUpdateGoal(goal._id, !goal.completed)}>
                            {goal.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
                        </button>
                        <button onClick={() => handleDeleteGoal(goal._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GoalList;
