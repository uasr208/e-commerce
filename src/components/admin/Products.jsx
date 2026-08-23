import {
  Button,
  Card,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Tag,
  Tooltip,
} from "antd";

import { Edit2, Plus, Search, Trash2 } from "lucide-react";
import React, { useState } from "react";

const categories = [
  "Electronics",
  "Fashion & Apparel",
  "Home & Kitchen",
  "Beauty & Personal Care",
  "Sports & Outdoors",
  "Books & Stationery",
  "Toys & Games",
  "Health & Wellness",
  "Groceries & Food",
  "Pet Supplies",
  "Automotive",
  "Jewelry & Watches",
  "Baby & Kids",
  "Furniture",
  "Office Supplies",
  "Shoes & Footwear",
  "Bags & Luggage",
  "Tools & Hardware",
  "Gifts & Occasions",
  "Art & Crafts",
];

const Products = () => {
  const [open, setOpen] = useState(false);
  const [productForm] = Form.useForm();
  const handleClose = () => {
    productForm.resetFields();
    setOpen(false);
  };

  const createProduct = (values) => {
    console.log(values);
    handleClose();
  };
  return (
    <div className="grid grid-cols-4 gap-6">
      <div className="col-span-4 flex justify-between items-center">
        <div>
          <Input
            size="large"
            placeholder="Search these products"
            className="!w-md"
            prefix={<Search className="w-4 h-4 text-gray-400" />}
          />
        </div>
        <Button
          onClick={() => setOpen(true)}
          size="large"
          type="primary"
          icon={<Plus className="w-4 h-4" />}
        >
          Add Product
        </Button>
      </div>
      {Array(24)
        .fill(0)
        .map((item, index) => (
          <Card
            className="bg-pink-700"
            key={index}
            hoverable
            cover={
              <img
                src="/images/product-placeholder.jpg"
                className="h-60 object-cover"
              />
            }
          >
            <Card.Meta
              title="NEWLY LAUNCHED RED SHIRT"
              description={
                <div className="flex items-center gap-2">
                  <label className="font-medium text-gray-600">2000</label>
                  <del className="text-rose-500">4000</del>
                  <label>(50% Discount)</label>
                </div>
              }
            />
            <Tag className="!mt-3">Men's Clothing</Tag>
            <div className="mt-4 space-x-3">
              <Tooltip title="Edit product">
                <Button
                  icon={<Edit2 className="w-4 h-4" />}
                  type="primary"
                  className="!bg-indigo-500"
                />
              </Tooltip>
              <Tooltip title="Delete product">
                <Popconfirm
                  title="Do you want to delete this product?"
                  onConfirm={() => alert()}
                >
                  <Button
                    icon={<Trash2 className="w-4 h-4" />}
                    type="primary"
                    danger
                  />
                </Popconfirm>
              </Tooltip>
            </div>
          </Card>
        ))}
      <Modal
        width={600}
        centered
        onCancel={handleClose}
        open={open}
        footer={null}
        title={<h1 className="text-lg">New product</h1>}
      >
        <Form
          layout="vertical"
          className="!mt-4"
          onFinish={createProduct}
          form={productForm}
        >
          <Form.Item
            label={
              <label className="text-base text-gray-500">Product name</label>
            }
            rules={[{ required: true }]}
            name="title"
          >
            <Input placeholder="Product name goes here" size="large" />
          </Form.Item>

          <div className="grid grid-cols-2 gap-6">
            <Form.Item
              label={<label className="text-base text-gray-500">Price</label>}
              rules={[{ required: true }]}
              name="price"
            >
              <Input placeholder="00.00" size="large" />
            </Form.Item>
            <Form.Item
              label={
                <label className="text-base text-gray-500">Discount</label>
              }
              name="discount"
            >
              <Input placeholder="0" size="large" />
            </Form.Item>
          </div>

          <Form.Item
            label={<label className="text-base text-gray-500">Category</label>}
            rules={[{ required: true }]}
            name="Category"
          >
            <Select size="large" placeholder="Choose category" showSearch>
              {categories.map((item, index) => (
                <Select.Option value={item} key={index}>
                  {item}
                </Select.Option>
              ))}
              <Select.Option value="other">Other</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label={
              <label className="text-base text-gray-500">Description</label>
            }
            rules={[{ required: true }]}
            name="description"
          >
            <Input.TextArea
              placeholder="Description goes here"
              size="large"
              rows={5}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" size="large" htmlType="submit">
              Submit
            </Button>
            <Button
              onClick={handleClose}
              type="primary"
              className="!bg-gray-100 hover:!bg-gray-200 !text-black !shadow-none !ml-3"
              size="large"
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Products;
