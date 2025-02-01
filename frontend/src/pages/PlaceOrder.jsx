import React, { useState, useContext } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    backendURL,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE.RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      description: "Order Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);
        try {
          const { data } = await axios.post(
            backendURL + "/api/order/verifyRazorpay",
            response,
            { headers: { token } }
          );
          if (data.success) {
            navigate("/orders");
            setCartItems({});
          } else {
            console.log(response.data);
          }
        } catch (error) {
          console.log(error);
          toast.error(error);
        }
      },
    };
    const rzp = new window.razorpay(options);
    rzp.open();
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };
      switch (method) {
        //api call on cod
        case "cod":
          const response = await axios.post(
            backendURL + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          console.log(response.data);
          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;

        case "stripe":
          const responseStripe = await axios.post(
            backendURL + "/api/order/stripe",
            orderData,
            { headers: { token } }
          );
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;

        case "razorpay":
          const responseRazorpay = await axios.post(
            backendURL + "/api/order/razorpay",
            orderData,
            { headers: { token } }
          );
          if (responseRazorpay.data.success) {
            initPay(responseRazorpay.data.order);
          } else {
            toast.warn(responseRazorpay.data.message);
            toast.info("Try another payment method");
          }

          break;

          ``;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* Delivery Information Section */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>

        <div className="space-y-4 text-left">
          <div className="flex gap-3">
            <input
              required
              onChange={onChangeHandler}
              name="firstName"
              value={formData.firstName}
              className="border border-gray-300 rounded px-4 py-2 h-10 w-full text-sm"
              type="text"
              placeholder="First name"
            />
            <input
              required
              onChange={onChangeHandler}
              name="lastName"
              value={formData.lastName}
              className="border border-gray-300 rounded px-4 py-2 h-10 w-full text-sm"
              type="text"
              placeholder="Last name"
            />
          </div>
          <input
            required
            onChange={onChangeHandler}
            name="email"
            value={formData.email}
            className="border border-gray-300 rounded px-4 py-2 h-10 w-full text-sm"
            type="email"
            placeholder="Email address"
          />
          <input
            required
            onChange={onChangeHandler}
            name="street"
            value={formData.street}
            className="border border-gray-300 rounded px-4 py-2 h-10 w-full text-sm"
            type="text"
            placeholder="Street"
          />
          <div className="flex gap-3">
            <input
              required
              onChange={onChangeHandler}
              name="city"
              value={formData.city}
              className="border border-gray-300 rounded px-4 py-2 h-10 w-full text-sm"
              type="text"
              placeholder="City"
            />
            <input
              required
              onChange={onChangeHandler}
              name="state"
              value={formData.state}
              className="border border-gray-300 rounded px-4 py-2 h-10 w-full text-sm"
              type="text"
              placeholder="State"
            />
          </div>
          <div className="flex gap-3">
            <input
              required
              onChange={onChangeHandler}
              name="zipcode"
              value={formData.zipcode}
              className="border border-gray-300 rounded px-4 py-2 h-10 w-full text-sm"
              type="number"
              placeholder="Zipcode"
            />
            <input
              required
              onChange={onChangeHandler}
              name="country"
              value={formData.country}
              className="border border-gray-300 rounded px-4 py-2 h-10 w-full text-sm"
              type="text"
              placeholder="Country"
            />
          </div>
          <input
            required
            onChange={onChangeHandler}
            name="Phone number"
            className="border border-gray-300 rounded px-4 py-2 h-10 w-full text-sm"
            type="number"
            placeholder="Phone number"
          />
        </div>

        {/* Cart Total Section */}
        <div className="mt-8">
          <CartTotal />
        </div>
      </div>

      {/* Payment Method Section */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
        </div>

        <div className="flex flex-col gap-4">
          <div
            onClick={() => setMethod("stripe")}
            className={`flex items-center gap-3 border p-2 px-3 cursor-pointer ${
              method === "stripe" ? "border-green-400" : ""
            }`}
          >
            <p
              className={`min-w-[14px] h-[14px] border rounded-full ${
                method === "stripe" ? "bg-green-400" : ""
              }`}
            ></p>
            <img className="h-5 mx-4" src={assets.stripe_logo} alt="Stripe" />
          </div>

          <div
            onClick={() => setMethod("razorpay")}
            className={`flex items-center gap-3 border p-2 px-3 cursor-pointer ${
              method === "razorpay" ? "border-green-400" : ""
            }`}
          >
            <p
              className={`min-w-[14px] h-[14px] border rounded-full ${
                method === "razorpay" ? "bg-green-400" : ""
              }`}
            ></p>
            <img
              className="h-5 mx-4"
              src={assets.razorpay_logo}
              alt="Razorpay"
            />
          </div>

          <div
            onClick={() => setMethod("cod")}
            className={`flex items-center gap-3 border p-2 px-3 cursor-pointer ${
              method === "cod" ? "border-green-400" : ""
            }`}
          >
            <p
              className={`min-w-[14px] h-[14px] border rounded-full ${
                method === "cod" ? "bg-green-400" : ""
              }`}
            ></p>
            <p className="text-gray-500 text-sm font-medium mx-4">
              CASH ON DELIVERY
            </p>
          </div>
        </div>

        <div className="w-full text-end mt-8">
          <button
            type="submit"
            className="bg-black text-white px-16 py-3 text-sm"
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
