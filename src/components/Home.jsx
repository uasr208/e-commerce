import React from "react";
import { fetcher } from "../lib/fetcher";
import useSWR, { mutate } from "swr";
import Loader from "./shared/Loader";
import Error from "./shared/Error";
import { Button, Card, Tag } from "antd";
import { priceCalculator } from "../lib/price-calculator";
import { ShoppingCart } from "lucide-react";
import { httpRequest } from "../lib/http-request";
import { toast } from "react-toastify";
import { useAuth } from "../zustand/useAuth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { data, error, isLoading } = useSWR("/products", fetcher);
  const { user } = useAuth();
  const navigate = useNavigate();

  const addToCart = async (id) => {
    try {
      if (!user || user.role !== "user") {
        navigate("/login");
        return;
      }
      const { data } = await httpRequest.post("/cart", { product: id });
      mutate("/cart");
      toast.success(data.message, { position: "top-center" });
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
  if (isLoading) return <Loader />;

  if (error) return <Error message={error.message} />;

  return (
    <div className="w-9/12 mx-auto py-16 grid grid-cols-4 gap-8">
      {data.map((item, index) => (
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
            title={item.title}
            description={
              <div className="flex items-center gap-2">
                <label className="font-medium text-gray-600">
                  ₹{priceCalculator(item.price, item.discount)}
                </label>
                <del className="text-rose-500">
                  ₹{item.price.toLocaleString()}
                </del>
                <label>({item.discount}% Discount)</label>
              </div>
            }
          />
          <Tag className="!mt-3">Men's Clothing</Tag>
          <div className="mt-4 space-x-3 flex flex-col">
            <Button
              onClick={() => addToCart(item._id)}
              size="large"
              type="primary"
              icon={<ShoppingCart />}
            >
              Add to cart
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Home;
