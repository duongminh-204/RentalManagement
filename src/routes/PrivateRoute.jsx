import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
    const [isChecking, setIsChecking] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('token');
            
            console.log('PrivateRoute: Checking token...', token ? '✅ Token found' : '❌ No token');

            setIsAuthenticated(!!token);
            setIsChecking(false);
        };

        checkAuth();

        // Listen for unauthorized events
        const handleUnauthorized = () => {
            console.log('PrivateRoute: Unauthorized detected, logging out');
            setIsAuthenticated(false);
        };

        window.addEventListener('storage', checkAuth);
        window.addEventListener('unauthorized', handleUnauthorized);
        
        return () => {
            window.removeEventListener('storage', checkAuth);
            window.removeEventListener('unauthorized', handleUnauthorized);
        };
    }, []);

    if (isChecking) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        console.log('PrivateRoute: Redirecting to /login');
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default PrivateRoute;