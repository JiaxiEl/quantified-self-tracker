'use client';

import * as React from 'react';
import { Goal } from '@/types/goal';
import { Task } from '@/types/task';
import { GoalForm } from '@/components/dashboard/goal/goal-form';
import { TaskForm } from '@/components/dashboard/task/task-form';
import { Card, CardContent, Typography, Button, Collapse, List, ListItem, ListItemText, Divider } from '@mui/material';

export default function Page(): React.JSX.Element {
    const [goals, setGoals] = React.useState<Goal[]>([]);
    const [tasks, setTasks] = React.useState<{ [goalId: string]: Task[] }>({});
    const [yourJWTToken, setYourJWTToken] = React.useState<string>('');
    const [expandedGoalId, setExpandedGoalId] = React.useState<string | null>(null);

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
            // Ensure tasks are stored as an array, even if empty
            setTasks((prevTasks) => ({ ...prevTasks, [goalId]: data || [] }));
        }
    };

    const handleToggleExpand = (goalId: string) => {
        setExpandedGoalId((prev) => (prev === goalId ? null : goalId));
        if (!tasks[goalId]) {
            fetchTasksForGoal(goalId).catch((err) => console.error('Error fetching tasks:', err));
        }
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Your Goals
            </Typography>
            {yourJWTToken && <GoalForm onGoalCreated={handleGoalCreated} yourJWTToken={yourJWTToken} />}
            <List>
                {goals.map((goal) => (
                    <Card key={goal._id} sx={{ mb: 2 }}>
                        <CardContent>
                            <Typography variant="h5">{goal.title}</Typography>
                            <Typography color="text.secondary">{goal.description}</Typography>
                            <Button
                                variant="contained"
                                color={goal.completed ? 'success' : 'primary'}
                                onClick={() => handleMarkComplete(goal._id)}
                                sx={{ mt: 2 }}
                            >
                                {goal.completed ? 'Completed' : 'Mark as Completed'}
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={() => handleToggleExpand(goal._id)}
                                sx={{ mt: 2, ml: 2 }}
                            >
                                {expandedGoalId === goal._id ? 'Hide Tasks' : 'Show Tasks'}
                            </Button>
                            <Collapse in={expandedGoalId === goal._id} timeout="auto" unmountOnExit>
                                <Divider sx={{ my: 2 }} />
                                <TaskForm goalId={goal._id} onTaskCreated={(newTask) => handleTaskCreated(goal._id, newTask)} yourJWTToken={yourJWTToken} />
                                {Array.isArray(tasks[goal._id]) && (
                                    <List sx={{ mt: 2 }}>
                                        {tasks[goal._id].map((task) => (
                                            <ListItem key={task._id}>
                                                <ListItemText
                                                    primary={task.title}
                                                    secondary={task.completed ? 'Completed' : 'Pending'}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                )}
                            </Collapse>
                        </CardContent>
                    </Card>
                ))}
            </List>
        </div>
    );
}
