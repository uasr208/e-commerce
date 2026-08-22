import React from "react";
import "animate.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLogin from "./components/admin/AdminLogin";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin">
          <Route path="login" element={<AdminLogin />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
