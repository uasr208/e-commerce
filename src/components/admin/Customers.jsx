import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../zustand/useAuth";
import { Select, Table } from "antd";
import { Loader2 } from "lucide-react";
import moment from "moment";
import { toast } from "react-toastify";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;
const Customers = () => {
  const { user } = useAuth();
  const [isLoading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const option = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get("/auth/users", option);
      setCustomers(data);
      console.log(data);
    } catch (err) {
      console.log(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const changeRole = async (role, id) => {
    try {
      const option = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(`/auth/users/${id}`, { role: role });
      toast.success(data.message);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    if (user) fetchUsers();
  }, [user]);

  const columns = [
    {
      key: "customersName",
      title: "Customer's name",
      render: (item) => <label className="capitalize">{item.fullname}</label>,
    },
    {
      key: "email",
      title: "Email",
      dataIndex: "email",
    },
    {
      key: "role",
      title: "Role",
      render: (item) => (
        <Select
          defaultValue={item.role}
          className="w-[90px]"
          onChange={(role) => changeRole(role, item._id)}
        >
          <Select.Option value="user">User</Select.Option>
          <Select.Option value="admin">Admin</Select.Option>
        </Select>
      ),
    },
    {
      key: "joinedAt",
      title: "Joined",
      render: (item) => moment(item.createdAt).format("MMM DD YYYY, hh:mm A"),
    },
  ];

  if (isLoading)
    return (
      <div className="flex pt-32 justify-center h-screen">
        <Loader2 className="animate-spin w-12 h-12 text-gray-400" />
      </div>
    );
  return (
    <div>
      <Table columns={columns} dataSource={customers} rowKey="_id" />
    </div>
  );
};

export default Customers;
