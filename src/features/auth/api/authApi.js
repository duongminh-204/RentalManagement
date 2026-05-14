import axios from '../../../utils/api';

const authApi = {
    login: async (credentials) => {
        const response = await axios.post('/api/auth/login', credentials);
        return response.data;
    },

    register: async (userData) => {
        const response = await axios.post('/api/auth/register', userData);
        return response.data;
    },

    forgotPassword: async (email) => {
        const response = await axios.post('/api/auth/forgot-password', { email });
        return response.data;
    }
};

export default authApi;