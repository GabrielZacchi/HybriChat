import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { selectUser } from "./Redux/userSlice";

function PrivateRoute({ children }) {
    const user = useSelector(selectUser);
    return user ? children : <Navigate to="/login" />
}

export default PrivateRoute;