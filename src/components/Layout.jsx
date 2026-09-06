import React from "react";
import { Link, Outlet } from "react-router-dom";

import {
  BadgeIndianRupee,
  ShoppingCart,
  Home,
  Settings2,
  LogOut,
  LogIn,
} from "lucide-react";
import { Avatar, Badge, Dropdown, Popconfirm } from "antd";
import { useAuth } from "../zustand/useAuth";
import { fetcher } from "../lib/fetcher";
import useSWR from "swr";

const menus = [
  {
    label: "Home",
    link: "/",
    icon: <Home className="w-5 h-5" />,
  },
  {
    label: "Checkout",
    link: "/users/checkout",
    icon: <BadgeIndianRupee className="w-5 h-5" />,
  },
];

const Layout = () => {
  const { logout, user } = useAuth();
  const { data, error, isLoading } = useSWR("/cart", fetcher);

  const accountMenu = [
    {
      label: <Link to="/users/settings">Settings</Link>,
      key: "settings",
      icon: <Settings2 className="w-4 h-4" />,
    },
    {
      label: (
        <Popconfirm title="Do you want to logout?" onConfirm={logout}>
          Logout
        </Popconfirm>
      ),
      key: "logout",
      icon: <LogOut className="w-4 h-4" />,
    },
  ];
  return (
    <div>
      <nav className="bg-white shadow-lg px-12 flex justify-between items-center">
        <Link to="/">
          <img src="/images/logo.png" alt="logo" className="w-24 " />
        </Link>
        <div className="flex  items-center">
          {menus.map((item, index) => (
            <Link
              to={item.link}
              key={index}
              className="flex items-center gap-1 text-gray-700 py-6 hover:bg-sky-400 hover:text-white px-6"
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
          <Link
            to="/users/carts"
            className="flex items-center gap-1 text-gray-700 py-6 hover:bg-sky-400 hover:text-white px-6"
          >
            <Badge count={data && data.length}>
              <ShoppingCart className="w-5 h-5" />
            </Badge>
            Carts
          </Link>
          <div className="ml-6">
            {user ? (
              <Dropdown
                menu={{ items: accountMenu }}
                className="animate__animated animate__fadeIn"
              >
                <Avatar
                  src="https://randomuser.me/api/portraits/men/36.jpg"
                  size="large"
                />
              </Dropdown>
            ) : (
              <Link
                to="/login"
                className="bg-linear-to-r from-amber-500 to-rose-500 hover:bg-linear-to-l transition duration-300 text-white font-medium px-8 py-2 rounded flex items-center"
              >
                <LogIn className="w-4 h-4 mr-2 animate__animated animate__fadeIn" />
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
      <section>
        <Outlet />
      </section>
      <footer>I am footer</footer>
    </div>
  );
};

export default Layout;
