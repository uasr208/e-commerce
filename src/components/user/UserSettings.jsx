import { Button, Card, Form, Input, InputNumber } from "antd";
import { Edit, Save } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";
import { fetcher } from "../../lib/fetcher";
import Loader from "../shared/Loader";
import Error from "../shared/Error";
import { httpRequest } from "../../lib/http-request";

const UserSettings = () => {
  const [isEditable, setEditable] = useState(false);
  const [form] = Form.useForm();
  const { data, error, isLoading } = useSWR("/auth/session", fetcher);

  const handleEditable = () => {
    setEditable(true);
    toast.success("This form is now editable", { position: "top-center" });
  };

  const updateUser = async (values) => {
    try {
      const { data } = await httpRequest.put("/auth/update", values);
      toast.success(data.message, { position: "top-center" });
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data]);
  if (isLoading) {
    return <Loader />;
  }
  if (error) return <Error message={error.message} />;
  return (
    <div className="animate__animated animate__fadeIn">
      <Card
        title={<h1 className="text-lg font-medium">Profile Information</h1>}
        className="shadow"
        extra={
          <Edit
            className="w-4 h-4 hover:scale-120 duration-300 active:scale-80"
            onClick={handleEditable}
          />
        }
      >
        <Form form={form} className="flex flex-col gap-4" onFinish={updateUser}>
          <div className="grid grid-cols-2 gap-6">
            <Form.Item
              name="fullname"
              label={
                <label className="text-base font-semibold">Fullname</label>
              }
              rules={[{ required: true }]}
            >
              <Input
                size="large"
                placeholder="Fullname"
                readOnly={!isEditable}
              />
            </Form.Item>

            <Form.Item
              name="email"
              label={<label className="text-base font-semibold">Email</label>}
              rules={[{ required: true }]}
            >
              <Input size="large" placeholder="Email" disabled />
            </Form.Item>
          </div>
          <Form.Item
            name="city"
            label={<label className="text-base font-semibold">City</label>}
            rules={[{ required: true }]}
          >
            <Input size="large" placeholder="City" readOnly={!isEditable} />
          </Form.Item>
          <div className="grid grid-cols-2 gap-6">
            <Form.Item
              name="state"
              label={<label className="text-base font-semibold">State</label>}
              rules={[{ required: true }]}
            >
              <Input size="large" placeholder="State" readOnly={!isEditable} />
            </Form.Item>

            <Form.Item
              name="country"
              label={<label className="text-base font-semibold">Country</label>}
              rules={[{ required: true }]}
            >
              <Input
                size="large"
                placeholder="Country"
                readOnly={!isEditable}
              />
            </Form.Item>

            <Form.Item
              name="pincode"
              label={<label className="text-base font-semibold">Pincode</label>}
              rules={[{ required: true, type: "number" }]}
            >
              <InputNumber
                size="large"
                placeholder="Pincode"
                readOnly={!isEditable}
                className="!w-full"
              />
            </Form.Item>

            <Form.Item
              name="mobile"
              label={<label className="text-base font-semibold">Mobile</label>}
              rules={[{ required: true, type: "number" }]}
            >
              <InputNumber
                size="large"
                placeholder="Mobile"
                readOnly={!isEditable}
                className="!w-full"
              />
            </Form.Item>
          </div>
          <Form.Item
            name="password"
            label={<label className="text-base font-semibold">Password</label>}
          >
            <Input.Password
              size="large"
              placeholder="**********"
              readOnly={!isEditable}
            />
          </Form.Item>
          <Form.Item>
            <Button
              disabled={!isEditable}
              type="primary"
              danger
              size="large"
              htmlType="submit"
              icon={<Save className="w-4 h-4" />}
            >
              Save
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default UserSettings;
