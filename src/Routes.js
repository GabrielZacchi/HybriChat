import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";

import PrivateRoute from "./PrivateRoute";

function RoutesHandler() {
    const [user, setUser] = React.useState(null);
    const value = React.useMemo(() => ({ user, setUser }), [user, setUser]);

    return (
        <Router>
            <Routes>
                <Route exat path="/login" element={<Login />} />
            </Routes>
        </Router>
    )
}

export default RoutesHandler;