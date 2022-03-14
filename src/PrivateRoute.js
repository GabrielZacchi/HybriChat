import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';

function PrivateRoute({ children }) {
    const [user, loadingAuth, error] = useAuthState(auth);
    return user ? children : <Navigate to="/login" />
}

export default PrivateRoute;