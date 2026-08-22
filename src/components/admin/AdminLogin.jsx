import React from "react";
import { Link } from "react-router-dom";

const AdminLogin = () => {
  return (
    <div className="bg-[#F8F7F4] h-screen flex items-center justify-center">
      <div className="bg-white w-7/12 shadow-lg rounded-lg grid grid-cols-2">
        <img
          src="/images/admin-login.avif"
          alt="admin login image"
          className="rounded-l-lg"
        />
        <div className="flex flex-col justify-center px-10 gap-6">
          <h1 className="text-2xl font-semibold text-gray-600">Admin Panel</h1>
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-zinc-700 font-medium">Email</label>
              <input
                type="email"
                placeholder="example@mail.com"
                className="border border-gray-200 rounded p-2"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-zinc-700 font-medium">Password</label>
              <input
                type="password"
                placeholder="***********"
                className="border border-gray-200 rounded p-2"
              />
            </div>
            <button className="p-2.5 rounded bg-[#27BE8C] text-white font-medium hover:bg-green-500 active:scale-80 duration-300">
              Login
            </button>
          </form>
          <div className="flex flex-col gap-2">
            <Link
              to="#"
              className="text-[#27BE8C] text-white font-medium hover:underline"
            >
              Forgot password
            </Link>
            <Link
              to="#"
              className="text-[#27BE8C] text-white font-medium hover:underline"
            >
              Create account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
