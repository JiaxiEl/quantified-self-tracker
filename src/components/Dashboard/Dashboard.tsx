import React from 'react';
import TaskList from '../Tasks/TaskList';
import HabitList from '../Habits/HabitList';

const Dashboard = () => {
    return (
        <div>
            <h2>Dashboard</h2>
            <p>Welcome to your dashboard. Here you can track your goals, habits, and tasks.</p>
            <TaskList />
            <HabitList />
        </div>
    );
};

export default Dashboard;
