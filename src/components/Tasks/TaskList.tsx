import React, { useState, useEffect } from 'react';
import taskService from '../../services/taskService';
import { Task } from '../../types/Task';

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const tasks: Task[] = await taskService.getTasks();
                setTasks(tasks);
            } catch (error) {
                setError('Failed to load tasks');
            }
        };
        fetchTasks();
    }, []);

    const handleCreateTask = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        try {
            const newTask: Task = await taskService.createTask(title, description);
            setTasks([...tasks, newTask]);
            setTitle('');
            setDescription('');
            setSuccess('Task created successfully');
        } catch (error) {
            setError('Failed to create task');
        }
    };

    const handleUpdateTask = async (taskId: string, completed: boolean) => {
        setError(null);
        setSuccess(null);
        try {
            const updatedTask: Task = await taskService.updateTask(taskId, undefined, undefined, completed);
            setTasks(tasks.map(task => task._id === taskId ? updatedTask : task));
            setSuccess('Task updated successfully');
        } catch (error) {
            setError('Failed to update task');
        }
    };

    const handleDeleteTask = async (taskId: string) => {
        setError(null);
        setSuccess(null);
        try {
            await taskService.deleteTask(taskId);
            setTasks(tasks.filter(task => task._id !== taskId));
            setSuccess('Task deleted successfully');
        } catch (error) {
            setError('Failed to delete task');
        }
    };

    return (
        <div>
            <h2>Tasks</h2>
            <form onSubmit={handleCreateTask}>
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
                <button type="submit">Create Task</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <ul>
                {tasks.map(task => (
                    <li key={task._id}>
                        <span>{task.title}</span>
                        <span>{task.description}</span>
                        <button onClick={() => handleUpdateTask(task._id, !task.completed)}>
                            {task.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
                        </button>
                        <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
