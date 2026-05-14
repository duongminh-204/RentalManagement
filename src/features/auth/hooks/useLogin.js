import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authApi from '../api/authApi';

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const login = async (phoneOrEmail, password) => {
        setLoading(true);
        setError('');

        try {
            const res = await authApi.login({ phoneOrEmail, password });
            
            // Lưu token và thông tin user (có thể dùng zustand sau)
            localStorage.setItem('token', res.token);
            localStorage.setItem('user', JSON.stringify(res.user));

            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Đăng nhập thất bại!');
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error };
};