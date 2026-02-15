import axios from 'axios';

export const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

apiClient.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const tokenCookie = document.cookie.split('; ').find((row) => row.startsWith('token='));
        if (tokenCookie) {
            const token = tokenCookie.split('=')[1];
            if (token) {
                config.headers = config.headers || {};
                (config.headers as any).Authorization = `Bearer ${token}`;
            }
        }
    }
    return config;
});
