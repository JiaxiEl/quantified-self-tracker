import React from 'react';
import TaskList from '../Tasks/TaskList';
import HabitList from '../Habits/HabitList';
import GoalList from '../Goals/GoalList';

const Dashboard = () => {
    return (
        <div>
            <h2>Dashboard</h2>
            <p>Welcome to your dashboard. Here you can track your goals, habits, and tasks.</p>
            <TaskList />
            <HabitList />
            <GoalList />
        </div>
    );
};

export default Dashboard;
