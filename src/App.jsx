import React from "react";
import "animate.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import Login from "./components/Login";
import Dashboard from "./components/admin/Dashboard";
import AuthGuard from "./components/AuthGuard";
import Layout from "./components/admin/Layout";
import Customers from "./components/admin/Customers";
import Orders from "./components/admin/Orders";
import Products from "./components/admin/Products";
import Settings from "./components/admin/Settings";
import NotFound from "./components/NotFound";
import Signup from "./components/Signup";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard />}>
          <Route path="login" element={<Login />} />
          <Route path="/admin" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="customers" element={<Customers />} />
            <Route path="orders" element={<Orders />} />
            <Route path="products" element={<Products />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
