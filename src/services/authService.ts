import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

const register = async (username: string, email: string, password: string) => {
    try {
        return await axios.post(`${API_URL}/register`, { username, email, password });
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            // Handle axios-specific error
            console.error(error.response?.data || 'An error occurred');
        } else if (error instanceof Error) {
            // Handle generic error
            console.error(error.message);
        } else {
            console.error('An unknown error occurred');
        }
    }
};

const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            // Handle axios-specific error
            console.error(error.response?.data || 'An error occurred');
        } else if (error instanceof Error) {
            // Handle generic error
            console.error(error.message);
        } else {
            console.error('An unknown error occurred');
        }
    }
};

const authService = {
    register,
    login,
};

export default authService;
