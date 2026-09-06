import { Button, Card, Empty, Popconfirm } from "antd";
import { Loader2, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import React, { useState } from "react";
import useSWR, { mutate } from "swr";
import { fetcher } from "../../lib/fetcher";
import Loader from "../shared/Loader";
import { priceCalculator } from "../../lib/price-calculator";
import ButtonGroup from "antd/es/button/ButtonGroup";
import { httpRequest } from "../../lib/http-request";
import { toast } from "react-toastify";

const calculateTotalAmount = (item) => {
  let totalAmount = 0;
  item.forEach((data) => {
    const qnt = data.qnt;
    const price = data.product.price;
    const discount = data.product.discount;
    const discountAmount = (price * discount) / 100;
    const realPriceAfterDiscount = price - discountAmount;
    const actualAmount = realPriceAfterDiscount * qnt;
    totalAmount = totalAmount + actualAmount;
  });
  return totalAmount;
};

const UserCarts = () => {
  const { data, error, isLoading } = useSWR("/cart", fetcher);
  const [loading, setLoading] = useState(false);

  const increaseDecreaseCart = async (id, qnt) => {
    try {
      await httpRequest.put(`/cart/${id}`, { qnt: qnt });
      mutate("/cart");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const deleteCart = async (id) => {
    try {
      await httpRequest.delete(`/cart/${id}`);
      mutate("/cart");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const checkoutNow = async (data) => {
    try {
      setLoading(true);
      const products = data.map((item) => ({
        id: item.product._id,
        qnt: item.qnt,
      }));
      const payload = {
        products: products,
      };
      const res = await httpRequest.post("/checkout", payload);
      window.location.href = res.data.paymentLink;
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  if (isLoading) return <Loader />;

  if (error) return <Error message={error.message} />;
  return (
    <div>
      <Card className="shadow-lg ">
        <Card.Meta
          title={
            <div className="flex items-center gap-2 ">
              <ShoppingCart />
              <h1>Shopping Carts</h1>
            </div>
          }
        />{" "}
        {data.length > 0 ? (
          <div className="mt-8 flex flex-col gap-6">
            {data.map((item, index) => (
              <Card hoverable key={index}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image || "/images/product-placeholder.jpg"}
                      className="w-34 rounded-lg"
                    />
                    <h1 className="capitalize font-semibold text-lg">
                      {item.product.title}
                    </h1>
                    <p className="text-gray-500">
                      {item.product.description.slice(0, 100)}...
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <label className="font-medium text-gray-600">
                        ₹
                        {priceCalculator(
                          item.product.price,
                          item.product.discount,
                        )}
                      </label>
                      <del className="text-rose-500">
                        ₹{item.product.price.toLocaleString()}
                      </del>
                      <label>({item.product.discount}% Discount)</label>
                    </div>
                    <Popconfirm
                      title="do you want to delete this cart?"
                      onConfirm={() => deleteCart(item._id)}
                    >
                      <Button
                        className="mt-3"
                        icon={<Trash2 className="w-4 h-4 " />}
                        danger
                        type="primary"
                      >
                        Delete
                      </Button>
                    </Popconfirm>
                  </div>

                  <div className="flex items-start">
                    <Card title="Quantity">
                      <ButtonGroup>
                        <Button
                          icon={<Minus className="w-4 h-4" />}
                          onClick={() =>
                            increaseDecreaseCart(item._id, item.qnt - 1)
                          }
                        />
                        <Button>{item.qnt}</Button>
                        <Button
                          icon={<Plus className="w-4 h-4" />}
                          onClick={() =>
                            increaseDecreaseCart(item._id, item.qnt + 1)
                          }
                        />
                      </ButtonGroup>
                    </Card>
                  </div>
                </div>
              </Card>
            ))}
            <div className="flex items-center justify-end gap-8">
              <h1 className="text-3xl font-bold">
                Total : ₹{calculateTotalAmount(data)}
              </h1>
              <button
                disabled={loading}
                onClick={() => checkoutNow(data)}
                className="flex items-center bg-green-600 text-white px-8 py-2 rounded font-medium hover:scale-110 transition duration-300"
              >
                {loading && <Loader2 className="animate-spin mr-1" />}
                Checkout
              </button>
            </div>
          </div>
        ) : (
          <Empty decscription="Cart is empty!!" />
        )}
      </Card>
    </div>
  );
};

export default UserCarts;
