import axios from 'axios';

const API_URL = 'http://localhost:5000/api/habits';

const createHabit = async (title: string, description: string, frequency: string) => {
    const response = await axios.post(`${API_URL}/create`, { title, description, frequency }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data;
};

const getHabits = async () => {
    const response = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data;
};

const updateHabit = async (habitId: string, title?: string, description?: string, frequency?: string) => {
    const response = await axios.put(`${API_URL}/update`, { habitId, title, description, frequency }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data;
};

const deleteHabit = async (habitId: string) => {
    const response = await axios.delete(`${API_URL}/delete`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        data: { habitId },  // Pass habitId in the data field
    });
    return response.data;
};

const habitService = {
    createHabit,
    getHabits,
    updateHabit,
    deleteHabit,
};

export default habitService;
