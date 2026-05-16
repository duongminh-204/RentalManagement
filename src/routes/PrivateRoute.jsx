import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

export const PrivateRoute = ({ children }) => {
    const [isChecking, setIsChecking] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('token');
            setIsAuthenticated(!!token);
            setIsChecking(false);
        };

        checkAuth();

        const handleUnauthorized = () => {
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
            <div className="flex h-screen items-center justify-center bg-surface-light">
                <div className="h-12 w-12 animate-spin rounded-full border-2 border-hairline-cloud border-t-primary" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="flex min-h-screen flex-col bg-surface-light">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
};

export default PrivateRoute;
