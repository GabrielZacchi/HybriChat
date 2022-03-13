import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Reset from "./pages/Reset";

import PrivateRoute from "./PrivateRoute";

function RoutesHandler() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PrivateRoute />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/reset" element={<Reset />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesHandler;