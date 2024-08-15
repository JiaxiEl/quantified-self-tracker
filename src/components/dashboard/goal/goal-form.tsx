import * as React from 'react';
import { Goal } from '@/types/goal'; // Import the Goal interface

export interface GoalFormProps {
    onGoalCreated: (newGoal: Goal) => void;
    yourJWTToken: string;
}

export function GoalForm({ onGoalCreated, yourJWTToken }: GoalFormProps): React.JSX.Element {
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [targetDate, setTargetDate] = React.useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const response = await fetch('/api/goals', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${yourJWTToken}`,
            },
            body: JSON.stringify({ title, description, targetDate }),
        });

        if (response.ok) {
            const newGoal: Goal = await response.json(); // Assuming the server returns the full Goal object
            onGoalCreated(newGoal);
        } else {
            console.error('Failed to create goal');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
            />
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                required
            />
            <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                required
            />
            <button type="submit">Create Goal</button>
        </form>
    );
}
