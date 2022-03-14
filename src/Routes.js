import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Reset from "./pages/Reset";

import Home from "./pages/Home";
import Chat from "./components/Chat/Chat";

import PrivateRoute from "./PrivateRoute";

function RoutesHandler() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/reset" element={<Reset />} />

                <Route exact path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
                <Route exact path="/channel" element={<PrivateRoute><Chat /></PrivateRoute>}/>
                <Route exact path="/channel/:id" element={<PrivateRoute><Chat /></PrivateRoute>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesHandler;