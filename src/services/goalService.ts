import axios from 'axios';

const API_URL = 'http://localhost:5000/api/goals';

const createGoal = async (title: string, description: string, targetDate: Date) => {
    const response = await axios.post(`${API_URL}/create`, { title, description, targetDate }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data;
};

const getGoals = async () => {
    const response = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data;
};

const updateGoal = async (goalId: string, title?: string, description?: string, targetDate?: Date, completed?: boolean) => {
    const response = await axios.put(`${API_URL}/update`, { goalId, title, description, targetDate, completed }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data;
};

const deleteGoal = async (goalId: string) => {
    const response = await axios.delete(`${API_URL}/delete`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        data: { goalId },  // Pass goalId in the data field
    });
    return response.data;
};

const goalService = {
    createGoal,
    getGoals,
    updateGoal,
    deleteGoal,
};

export default goalService;
