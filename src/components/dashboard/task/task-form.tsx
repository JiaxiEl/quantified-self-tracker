"use client";

import * as React from 'react';
import { Task } from '@/types/task';

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
        } else {
            console.error('Failed to create task');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task Title"
                required
            />
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Task Description"
                required
            />
            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
            />
            <button type="submit">Create Task</button>
        </form>
    );
}
