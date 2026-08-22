import React from "react";
import "animate.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import Login from "./components/Login";
import Dashboard from "./components/admin/Dashboard";
import AuthGuard from "./components/AuthGuard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route element={<AuthGuard />}>
          <Route path="/admin">
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
