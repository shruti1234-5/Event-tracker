import axios from 'axios';

const API = axios.create({
    baseURL: 'https://event-tracker-1.onrender.com/api',
});

// Add a request interceptor to include token
API.interceptors.request.use((config) => {
    const userInfo = localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null;

    if (userInfo && userInfo.token) {
        config.headers.Authorization = `Bearer ${userInfo.token}`;
    }
    return config;
});

export default API;
