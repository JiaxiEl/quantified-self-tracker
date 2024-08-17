"use client";

import * as React from 'react';
import { GoalForm } from '@/components/dashboard/goal/goal-form';
import { Goal } from '@/types/goal';

export default function Page(): React.JSX.Element {
    const [goals, setGoals] = React.useState<Goal[]>([]);
    const [yourJWTToken, setYourJWTToken] = React.useState<string | null>(null);

    React.useEffect(() => {
        const fetchGoals = async () => {
            const token = localStorage.getItem('custom-auth-token');
            setYourJWTToken(token);

            if (token) {
                const response = await fetch('/api/goals', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data: Goal[] = await response.json();
                setGoals(data);
            } else {
                console.error('No JWT token found');
            }
        };

        fetchGoals().catch((err) => console.error('Error fetching goals:', err));
    }, []);

    const handleGoalCreated = (newGoal: Goal) => {
        setGoals((prevGoals) => [...prevGoals, newGoal]);
    };

    const handleMarkComplete = async (goalId: string) => {
        const response = await fetch(`/api/goals/${goalId}/complete`, {
            method: 'PATCH',
            headers: { Authorization: `Bearer ${yourJWTToken}` },
        });

        if (response.ok) {
            const updatedGoal = await response.json();
            setGoals((prevGoals) =>
                prevGoals.map((goal) => (goal._id === goalId ? updatedGoal : goal))
            );
        } else {
            console.error('Failed to mark goal as completed');
        }
    };

    return (
        <div>
            <h1>Your Goals</h1>
            {yourJWTToken && <GoalForm onGoalCreated={handleGoalCreated} yourJWTToken={yourJWTToken} />}
            <ul>
                {goals.map((goal) => (
                    <li key={goal._id}>
                        {goal.title}
                        <button onClick={() => handleMarkComplete(goal._id)}>
                            {goal.completed ? 'Completed' : 'Mark as Completed'}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
