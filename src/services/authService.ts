import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

const register = (username: string, email: string, password: string) => {
    return axios.post(`${API_URL}/register`, { username, email, password });
};

const login = async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

const authService = {
    register,
    login,
};

export default authService;
