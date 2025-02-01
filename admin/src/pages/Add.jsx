import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [detailedDescription, setDetailedDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [bestSeller, setBestseller] = useState(false);
  const [Sizes, setSizes] = useState([]);

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/collection`); // Backend API call to fetch collection data

      // Filter out only valid categories
      const validCategories = response.data.filter(
        (item) => item.category && item.category.trim() !== ""
      );
      setCategories(validCategories); // Save categories in state

      // Extract all subcategories from the response
      const subCategoriesList = response.data.flatMap(
        (item) => item.subCategory || []
      );
      setSubCategories(subCategoriesList); // Save subcategories in state
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories(); // Fetch categories and subcategories on mount
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("detailedDescription", detailedDescription);
      formData.append("price", price);
      formData.append("category", selectedCategory);
      formData.append("subCategory", selectedSubCategory);
      formData.append("bestSeller", bestSeller);
      formData.append("sizes", JSON.stringify(Sizes));
      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        `${backendURL}/api/product/add`,
        formData,
        { headers: { token } }
      );

      console.log(response.data);
      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setDetailedDescription("");
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);
        setPrice("");
        setBestseller(false);
        setSizes([]);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        error?.message || "An error occurred while submitting the form."
      );
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-start w-full gap-3"
    >
      <div>
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-20"
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt=""
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>
          <label htmlFor="image2">
            <img
              className="w-20"
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt=""
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>
          <label htmlFor="image3">
            <img
              className="w-20"
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt=""
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
          </label>
          <label htmlFor="image4">
            <img
              className="w-20"
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt=""
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Product description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Write content here"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Detailed description</p>
        <textarea
          onChange={(e) => setDetailedDescription(e.target.value)}
          value={detailedDescription}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Write detailed content here"
          required
        />
      </div>

      <div className="flex flex-col w-full gap-2 sm:flex-row sm:gap-8">
        <div>
          <p className="mb-2">Product category</p>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border px-2 py-1"
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((categoryItem) => (
              <option key={categoryItem._id} value={categoryItem.category}>
                {categoryItem.category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p className="mb-2">Product Sub category</p>
          <select
            value={selectedSubCategory}
            onChange={(e) => setSelectedSubCategory(e.target.value)}
            className="border px-2 py-1"
          >
            <option value="" disabled>
              Select a subcategory
            </option>
            {subCategories.map((subCategoryItem, index) => (
              <option key={index} value={subCategoryItem}>
                {subCategoryItem}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className="mb-2">Product Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-3 py-2 sm:w-[128px]"
            type="Number"
            placeholder="25"
          />
        </div>
      </div>

      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("S")
                  ? prev.filter((item) => item !== "S")
                  : [...prev, "S"]
              )
            }
          >
            <p
              className={`${
                Sizes.includes("S") ? "bg-pink-100" : "bg-slate-200"
              }  px-3 py-1 cursor-pointer`}
            >
              S
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("M")
                  ? prev.filter((item) => item !== "M")
                  : [...prev, "M"]
              )
            }
          >
            <p
              className={`${
                Sizes.includes("M") ? "bg-pink-100" : "bg-slate-200"
              }  px-3 py-1 cursor-pointer`}
            >
              M
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("L")
                  ? prev.filter((item) => item !== "L")
                  : [...prev, "L"]
              )
            }
          >
            <p
              className={`${
                Sizes.includes("L") ? "bg-pink-100" : "bg-slate-200"
              }  px-3 py-1 cursor-pointer`}
            >
              L
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("XL")
                  ? prev.filter((item) => item !== "XL")
                  : [...prev, "XL"]
              )
            }
          >
            <p
              className={`${
                Sizes.includes("XL") ? "bg-pink-100" : "bg-slate-200"
              }  px-3 py-1 cursor-pointer`}
            >
              XL
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("XXL")
                  ? prev.filter((item) => item !== "XXL")
                  : [...prev, "XXL"]
              )
            }
          >
            <p
              className={`${
                Sizes.includes("XXL") ? "bg-pink-100" : "bg-slate-200"
              }  px-3 py-1 cursor-pointer`}
            >
              XXL
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input
          onChange={() => {
            setBestseller((prev) => !prev);
          }}
          checked={bestSeller}
          type="checkbox"
          id="bestseller"
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to bestseller
        </label>
      </div>

      <button type="submit" className="py-3 mt-4 text-white bg-black w-28">
        ADD
      </button>
    </form>
  );
};

export default Add;
