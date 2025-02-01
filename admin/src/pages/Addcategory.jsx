import React, { useState } from "react";
import axios from "axios";
import { backendURL } from "../App";
import { toast } from "react-toastify";

const AddCategory = ({ token }) => {
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const data = {};
      if (category) data.category = category;
      if (subCategory) data.subCategory = subCategory;

      const response = await axios.post(`${backendURL}/api/collection`, data, {
        headers: { token },
      });
      toast.success(response.data.message);
      setCategory("");
      setSubCategory("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add category or subcategory");
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleAddCategory} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label className="mb-2" htmlFor="category">
            Category
          </label>
          <input
            id="category"
            type="text"
            value={category}
            className="w-full max-w-[500px] px-3 py-2"
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2" htmlFor="subCategory">
            SubCategory
          </label>
          <input
            id="subCategory"
            type="text"
            value={subCategory}
            className="w-full max-w-[500px] px-3 py-2"
            onChange={(e) => setSubCategory(e.target.value)}
          />
        </div>
        <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
