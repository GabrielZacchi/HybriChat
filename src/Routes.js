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
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/reset" element={<Reset />} />

                <Route exact path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
                <Route path="/channel" element={<PrivateRoute><Chat /></PrivateRoute>}/>
                <Route path="/channel/:id" element={<PrivateRoute><Chat /></PrivateRoute>}/>

            </Routes>
        </BrowserRouter>
    )
}

export default RoutesHandler;