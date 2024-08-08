import React, { useState, useEffect } from 'react';
import habitService from '../../services/habitService';
import { Habit } from '../../types/Habit';

const HabitList: React.FC = () => {
    const [habits, setHabits] = useState<Habit[]>([]);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [frequency, setFrequency] = useState<string>('daily');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    useEffect(() => {
        const fetchHabits = async () => {
            try {
                const habits: Habit[] = await habitService.getHabits();
                setHabits(habits);
            } catch (error) {
                setError('Failed to load habits');
            }
        };
        fetchHabits();
    }, []);

    const handleCreateHabit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        try {
            const newHabit: Habit = await habitService.createHabit(title, description, frequency);
            setHabits([...habits, newHabit]);
            setTitle('');
            setDescription('');
            setFrequency('daily');
            setSuccess('Habit created successfully');
        } catch (error) {
            setError('Failed to create habit');
        }
    };

    const handleUpdateHabit = async (habitId: string, newFrequency: string) => {
        setError(null);
        setSuccess(null);
        try {
            const updatedHabit: Habit = await habitService.updateHabit(habitId, undefined, undefined, newFrequency);
            setHabits(habits.map(habit => habit._id === habitId ? updatedHabit : habit));
            setSuccess('Habit updated successfully');
        } catch (error) {
            setError('Failed to update habit');
        }
    };

    const handleDeleteHabit = async (habitId: string) => {
        setError(null);
        setSuccess(null);
        try {
            await habitService.deleteHabit(habitId);
            setHabits(habits.filter(habit => habit._id !== habitId));
            setSuccess('Habit deleted successfully');
        } catch (error) {
            setError('Failed to delete habit');
        }
    };

    return (
        <div>
            <h2>Habits</h2>
            <form onSubmit={handleCreateHabit}>
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
                <select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                </select>
                <button type="submit">Create Habit</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <ul>
                {habits.map(habit => (
                    <li key={habit._id}>
                        <span>{habit.title}</span>
                        <span>{habit.description}</span>
                        <span>{habit.frequency}</span>
                        <button onClick={() => handleUpdateHabit(habit._id, habit.frequency === 'daily' ? 'weekly' : 'daily')}>
                            {habit.frequency === 'daily' ? 'Mark as Weekly' : 'Mark as Daily'}
                        </button>
                        <button onClick={() => handleDeleteHabit(habit._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HabitList;
