import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import isLogin from './components/Login/useAuth';

function PrivateRoute({ children, ...rest }) {
    let auth = isLogin();
    return (
        <Route {...rest} render={() => auth ? children : <Navigate to="/login" />} />
    );
}

export default PrivateRoute;