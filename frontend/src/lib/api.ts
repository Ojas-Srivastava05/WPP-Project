import axios from 'axios';

// Create a configured Axios instance
export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
    (config) => {
        // In a real app with Next.js, you might want to get this from a secure HTTP-only cookie using Server Actions
        // For now we'll check localStorage for the JWT if we're on the client
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('access_token');
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor for token refresh (stubbed out for simplicity, could be enhanced)
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        // Handle 401 Unauthorized globally here (e.g. refresh token logic)
        if (error.response?.status === 401 && typeof window !== 'undefined') {
            // localStorage.removeItem('access_token');
            // window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
