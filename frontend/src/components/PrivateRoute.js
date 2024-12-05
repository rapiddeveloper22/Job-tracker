import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('authToken'); // Replace with your authentication logic
    return token ? children : <Navigate to="/" />;
};

export default PrivateRoute;
