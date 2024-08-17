'use client';

import * as React from 'react';
import { Goal } from '@/types/goal';
import { Task } from '@/types/task';
import { GoalForm } from '@/components/dashboard/goal/goal-form';
import { TaskForm } from '@/components/dashboard/task/task-form';

export default function Page(): React.JSX.Element {
    const [goals, setGoals] = React.useState<Goal[]>([]);
    const [tasks, setTasks] = React.useState<{ [goalId: string]: Task[] }>({});
    const [yourJWTToken, setYourJWTToken] = React.useState<string>('');

    React.useEffect(() => {
        const fetchGoals = async () => {
            const token = localStorage.getItem('custom-auth-token');
            if (token) {
                setYourJWTToken(token);

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

    const handleTaskCreated = (goalId: string, newTask: Task) => {
        setTasks((prevTasks) => ({
            ...prevTasks,
            [goalId]: [...(prevTasks[goalId] || []), newTask],
        }));
    };

    const handleMarkComplete = async (goalId: string) => {
        if (yourJWTToken) {
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
        }
    };

    const fetchTasksForGoal = async (goalId: string) => {
        if (yourJWTToken) {
            const response = await fetch(`/api/tasks/${goalId}`, {
                headers: { Authorization: `Bearer ${yourJWTToken}` },
            });
            const data: Task[] = await response.json();
            setTasks((prevTasks) => ({ ...prevTasks, [goalId]: data }));
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
                        <button onClick={() => fetchTasksForGoal(goal._id)}>Show Tasks</button>
                        {tasks[goal._id] && (
                            <ul>
                                {tasks[goal._id].map((task) => (
                                    <li key={task._id}>
                                        {task.title} - {task.completed ? 'Completed' : 'Pending'}
                                    </li>
                                ))}
                            </ul>
                        )}
                        <TaskForm goalId={goal._id} onTaskCreated={(newTask) => handleTaskCreated(goal._id, newTask)} yourJWTToken={yourJWTToken} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
