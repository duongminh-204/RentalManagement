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

            console.log('Attempting login with:', { email: phoneOrEmail });

            const res = await authApi.login({ email: phoneOrEmail, password });
            console.log('Login response:', res);

            if (!res?.token) {
                throw new Error('Server không trả về token. Vui lòng thử lại.');
            }

            // Lưu thông tin vào localStorage
            localStorage.setItem('token', res.token);
            localStorage.setItem('user', JSON.stringify(res.user || {}));

            console.log(' Login successful - Token saved');

          
            navigate('/dashboard', { replace: true });

        } catch (err) {
            console.error('Login error details:', err);

            const errorMessage = 
                err.response?.data?.message || 
                err.message || 
                'Đăng nhập thất bại! Vui lòng kiểm tra lại thông tin.';

            setError(errorMessage);
        } finally {
            setLoading(false);   
        }
    };

    return { login, loading, error };
};