import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import isLogin from './components/Login/useAuth';

function PublicRoute({ children, restricted, ...rest }){
    let auth = isLogin();
    return(
        <Route {...rest} render={() => (
            auth && restricted ?
                <Navigate  to="/" /> 
            : children)} />
    );
}

export default PublicRoute;