import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItems";
import axios from "axios";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/collection`);
      const validCategories = response.data.filter(
        (item) => item.category && item.category.trim() !== ""
      );
      setCategories(validCategories);

      // Handle subcategories independently, even if categories are empty
      const subCategoriesList = response.data.flatMap(
        (item) => item.subCategory || []
      );
      setSubCategories(subCategoriesList);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();

    // Polling every 5 seconds
    const interval = setInterval(() => {
      fetchCategories();
    }, 5000);

    return () => clearInterval(interval); // Clean up interval on unmount
  }, []);

  const toggleCategory = (e) => {
    setCategory((prev) =>
      prev.includes(e.target.value)
        ? prev.filter((item) => item !== e.target.value)
        : [...prev, e.target.value]
    );
  };

  const toggleSubCategory = (e) => {
    setSubCategory((prev) =>
      prev.includes(e.target.value)
        ? prev.filter((item) => item !== e.target.value)
        : [...prev, e.target.value]
    );
  };

  useEffect(() => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    switch (sortType) {
      case "low-high":
        productsCopy.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        productsCopy.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilterProducts(productsCopy);
  }, [category, subCategory, showSearch, search, products, sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Option */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {categories.map(
              (categoryItem) =>
                categoryItem.category && (
                  <p key={categoryItem._id} className="flex gap-2">
                    <input
                      className="w-3"
                      type="checkbox"
                      value={categoryItem.category}
                      onChange={toggleCategory}
                    />
                    {categoryItem.category}
                  </p>
                )
            )}
          </div>
        </div>
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">SUBCATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {subCategories.length > 0 ? (
              subCategories.map((subCategoryItem, index) => (
                <p key={index} className="flex gap-2">
                  <input
                    className="w-3"
                    type="checkbox"
                    value={subCategoryItem}
                    onChange={toggleSubCategory}
                  />
                  {subCategoryItem}
                </p>
              ))
            ) : (
              <p className="text-gray-500">No subcategories available</p>
            )}
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value="relevant">Sort by : Relevant</option>
            <option value="low-high">Sort by : low-high</option>
            <option value="high-low">Sort by : high-low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
