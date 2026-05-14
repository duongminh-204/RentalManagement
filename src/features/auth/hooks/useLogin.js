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
            if (!phoneOrEmail || !password) {
                throw new Error('Vui lòng nhập email/số điện thoại và mật khẩu');
            }

            console.log('Attempting login with:', { phoneOrEmail });
            const res = await authApi.login({ phoneOrEmail, password });
            console.log('Login response:', res);
            
            if (!res.token) {
                throw new Error('Server không trả về token. Vui lòng thử lại.');
            }

            // Lưu token và thông tin user
            localStorage.setItem('token', res.token);
            localStorage.setItem('user', JSON.stringify(res.user || {}));
            console.log('Token saved successfully:', res.token);

            // Delay một chút để đảm bảo localStorage được cập nhật
            setTimeout(() => {
                console.log('Navigating to dashboard...');
                navigate('/dashboard');
            }, 100);

        } catch (err) {
            console.error('Login error details:', err);
            const errorMessage = err.response?.data?.message 
                || err.message 
                || 'Đăng nhập thất bại! Vui lòng kiểm tra lại thông tin.';
            setError(errorMessage);
            setLoading(false);
        }
    };

    return { login, loading, error };
};