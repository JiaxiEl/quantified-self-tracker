import axios from 'axios';

const API_URL = 'http://localhost:5000/api/user';

const getProfile = async () => {
    const response = await axios.get(`${API_URL}/profile`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data;
};

const updateProfile = async (username: string, bio: string) => {
    const response = await axios.put(`${API_URL}/profile`, { username, bio }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data;
};

const userService = {
    getProfile,
    updateProfile,
};

export default userService;
