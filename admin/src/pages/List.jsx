import React, { useEffect, useState } from "react";
import { backendURL, currency } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const List = () => {
  const [list, setList] = useState([]);
  const token = localStorage.getItem("token");

  const fetchList = async () => {
    try {
      const response = await axios.get(backendURL + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
        toast.info(response.data.message);
      } else {
        toast.info(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendURL + "/api/product/remove",
        { id },
        { headers: { token } }
      );
      if (response.data.succes) {
        toast.info(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchList();
  }, [fetchList]);
  return (
    <>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2">
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {list.map((item, index) => (
          <div
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
            key={index}
          >
            <img
              className="w-12"
              src={item.image[0] || assets.upload_area}
              alt=""
            />

            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>
              {currency}
              {item.price}
            </p>
            <p
              onClick={() => removeProduct(item._id)}
              className="text-right md:text-center cursor-pointer text-lg"
            >
              ❌
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
