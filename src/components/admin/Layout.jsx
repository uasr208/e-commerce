import { Avatar, Badge, Dropdown, Popconfirm } from "antd";
import {
  AlignRight,
  Axis3D,
  Bell,
  LayoutDashboard,
  ListOrdered,
  LogOut,
  Settings2,
  ShoppingBag,
  ShoppingCart,
  User,
} from "lucide-react";
import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../zustand/useAuth";

const Layout = () => {
  const [space, setSpace] = useState(270);
  const { logout } = useAuth();
  const location = useLocation();

  const accountMenu = [
    {
      label: <Link to="/admin/dashboard">Dashboard</Link>,
      key: "dashboard",
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      label: <Link to="/admin/settings">Settings</Link>,
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

  const menus = [
    {
      label: "Dashboard",
      href: "/admin/dashboard",
      icon: <Axis3D className="w-4 h-4" />,
    },
    {
      label: "Customers",
      href: "/admin/customers",
      icon: <User className="w-4 h-4" />,
    },
    {
      label: "Orders",
      href: "/admin/orders",
      icon: <ListOrdered className="w-4 h-4" />,
    },
    {
      label: "Products",
      href: "/admin/products",
      icon: <ShoppingBag className="w-4 h-4" />,
    },
    {
      label: "Settings",
      href: "/admin/settings",
      icon: <Settings2 className="w-4 h-4" />,
    },
  ];

  return (
    <div className="bg-[#F8F7F4] min-h-screen">
      {/* sidebar */}
      <aside
        style={{ transition: "0.3s", width: space }}
        className="overflow-x-hidden flex flex-col justify-between fixed top-0 left-0 bg-white h-full  border-r border-r-slate-200"
      >
        <div className="flex items-center gap-2 px-6 py-5.5">
          <button className="bg-amber-600 text-white w-10 h-10 rounded-full flex items-center justify-center">
            <ShoppingCart className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold">Ecommerce</h1>
        </div>

        <div className="flex flex-col w-full px-6 flex-1 gap-1">
          {menus.map((item, index) => (
            <Link key={index} to={item.href}>
              <button
                className={`py-2 rounded w-full duration-300 px-2 w-full flex items-center gap-3 text-gray-500 hover:text-gray-800 hover:bg-gray-100 font-medium ${item.href === location.pathname ? "bg-gray-200" : "bg-white"}`}
              >
                {item.icon}
                {item.label}
              </button>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 justify-center py-5.5 px-6">
          <Popconfirm
            title="Do you want to logout from account?"
            onConfirm={logout}
          >
            <button className="gap-2 flex items-center w-full bg-rose-500 font-medium hover:scale-105 active:scale-80 duration-300 text-white justify-center py-2.5 rounded-lg">
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </Popconfirm>
        </div>
      </aside>

      {/* Content */}
      <section style={{ transition: "0.3s", marginLeft: space }}>
        <nav className="bg-white  sticky top-0 left-0 px-12 py-4 w-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSpace(space === 0 ? 270 : 0)}
              className="hover:bg-gray-200 duration-300 p-2 rounded bg-gray-100 active:scale-80"
            >
              <AlignRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-6">
            <Badge count={8}>
              <Bell className="w-5 h-5 text-gray-500" />
            </Badge>
            <Dropdown menu={{ items: accountMenu }}>
              <Avatar
                src="https://randomuser.me/api/portraits/men/36.jpg"
                size="large"
              />
            </Dropdown>
          </div>
        </nav>
        <div className="px-12 py-8 space-y-8">
          <div className="flex gap-3">
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-white bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500">
              {menus.find((menu) => menu.href === location.pathname).icon}
            </button>
            <h1 className="text-3xl font-bold capitalize ">
              {location.pathname.split("/").pop()}
            </h1>
          </div>
          <Outlet />
        </div>
      </section>
    </div>
  );
};

export default Layout;
