import React from 'react';
import TaskList from '../Tasks/TaskList';

const Dashboard = () => {
    return (
        <div>
            <h2>Dashboard</h2>
            <p>Welcome to your dashboard. Here you can track your goals, habits, and tasks.</p>
            <TaskList />
        </div>
    );
};

export default Dashboard;
