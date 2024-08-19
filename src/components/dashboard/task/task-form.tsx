"use client";

import * as React from 'react';
import { Task } from '@/types/task';
import { Button, TextField, Box } from '@mui/material';

export interface TaskFormProps {
    goalId: string;
    onTaskCreated: (newTask: Task) => void;
    yourJWTToken: string;
}

export function TaskForm({ goalId, onTaskCreated, yourJWTToken }: TaskFormProps): React.JSX.Element {
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [dueDate, setDueDate] = React.useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const response = await fetch(`/api/tasks/${goalId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${yourJWTToken}`,
            },
            body: JSON.stringify({ title, description, dueDate }),
        });

        if (response.ok) {
            const newTask: Task = await response.json();
            onTaskCreated(newTask);
            setTitle('');
            setDescription('');
            setDueDate('');
        } else {
            console.error('Failed to create task');
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
                fullWidth
                label="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                sx={{ mb: 2 }}
            />
            <TextField
                fullWidth
                label="Task Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                sx={{ mb: 2 }}
            />
            <TextField
                fullWidth
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
                sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" color="primary">
                Create Task
            </Button>
        </Box>
    );
}
