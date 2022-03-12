import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function PrivateRoute({ children }) {
    const [user, loading, error] = useAuthState(auth);
    return user ? children : <Navigate to="/login" />
}

export default PrivateRoute;