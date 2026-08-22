const env = import.meta.env;
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../zustand/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";

axios.defaults.baseURL = env.VITE_SERVER_URL;
const AuthGuard = () => {
  const location = useLocation();
  const [isLogin, setLogin] = useState(null);
  const { user } = useAuth();

  const checkToken = async (token) => {
    try {
      await axios.post("/auth/verify", { token });
      setLogin(true);
    } catch (err) {
      setLogin(false);
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) {
      checkToken(user.token);
    } else {
      setLogin(false);
    }
  }, [user]);
  if (isLogin === null)
    return (
      <div className="bg-gray-100 h-screen flex items-center justify-center animate__animated animate__fadeIn">
        <Loader2 className="animate-spin w-16 h-16 text-indigo-600" />
      </div>
    );

  if (isLogin === false) {
    if (location.pathname === "/login") return <Outlet />;
    else <Navigate to="/login" />;
  }

  if (location.pathname === "/login") return <Navigate to="/admin/dashboard" />;
  return <Outlet />;
};

export default AuthGuard;
