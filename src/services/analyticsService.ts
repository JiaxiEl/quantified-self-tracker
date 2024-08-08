import axios from 'axios';

const API_URL = 'http://localhost:5000/api/analytics';

const getAnalytics = async () => {
    const response = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data;
};

const analyticsService = {
    getAnalytics,
};

export default analyticsService;
