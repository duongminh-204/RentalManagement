import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
  const [isChecking, setIsChecking] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Kiểm tra token từ localStorage
    const storedToken = localStorage.getItem('token');
    console.log('PrivateRoute: Checking token...', storedToken ? 'Token found' : 'No token');
    setToken(storedToken);
    setIsChecking(false);
  }, []);

  if (isChecking) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!token) {
    console.log('PrivateRoute: No token found, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
