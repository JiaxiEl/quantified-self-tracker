import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

const createTask = async (title: string, description: string) => {
    const response = await axios.post(`${API_URL}/create`, { title, description }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data;
};

const getTasks = async () => {
    const response = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data;
};

const updateTask = async (taskId: string, title?: string, description?: string, completed?: boolean) => {
    const response = await axios.put(`${API_URL}/update`, { taskId, title, description, completed }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data;
};

const deleteTask = async (taskId: string) => {
    const response = await axios.delete(`${API_URL}/delete`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        data: { taskId },  // Pass taskId in the data field
    });
    return response.data;
};

const taskService = {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
};

export default taskService;
