import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets.js";
import RelatedProducts from "../components/RelatedProducts.jsx";
import Review from "../components/Review.jsx";
import WishlistButton from "../components/WishlistButton.jsx";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [activeTab, setActiveTab] = useState("description");

  const fetchProductData = () => {
    const foundProduct = products.find((item) => item._id === productId);
    if (foundProduct) {
      setProductData(foundProduct);
      if (!image || !productData || productData._id !== foundProduct._id) {
        setImage(foundProduct.image[0]);
      }
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  useEffect(() => {
    document.documentElement.classList.add("scroll-smooth");

    window.scrollTo(0, 0);
  }, [productId]);

  return productData ? (
    <div className="pt-10 transition-opacity duration-500 ease-in border-t-2 opacity-100">
      {/* ----- Product Data ----- */}
      <div className="flex flex-col gap-12 sm:gap-12 sm:flex-row">
        {/* ----- Product Images ----- */}
        <div className="flex flex-col-reverse flex-1 gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex;shrink-0 cursor-pointer"
              ></img>
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="Main product" />
          </div>
        </div>
        {/*----- Product Info -----*/}
        <div className="flex-1">
          <h1 className="mt-2 text-2xl font-medium">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-4" />
            <img src={assets.star_icon} alt="" className="w-4" />
            <img src={assets.star_icon} alt="" className="w-4" />
            <img src={assets.star_icon} alt="" className="w-4" />
            <img src={assets.star_dull_icon} alt="" className="w-4" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p> Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 ${
                    item === size ? "border-orange-500" : ""
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => addToCart(productData._id, size)}
              className="px-8 py-3 text-sm text-white bg-black active:bg-gray-700"
            >
              ADD TO CART
            </button>
            <WishlistButton
              productId={productData._id}
              isInitiallyInWishlist={false}
            />
          </div>

          <hr className="mt-8 sm:w-4/5" />
          <div className="flex flex-col gap-1 mt-5 text-sm text-gray-500">
            <p> 100% Original Product </p>
            <p> Cash on delivery is available on this product. </p>
            <p> Easy return and exchange policy within 7 days. </p>
          </div>
        </div>
      </div>

      {/* ------ Description & Review Section ------- */}
      <div className="mt-20">
        <div className="flex">
          <button
            onClick={() => setActiveTab("description")}
            className={`px-5 py-3 text-sm border ${
              activeTab === "description" ? "border-b-2 border-black" : ""
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-5 py-3 text-sm border ${
              activeTab === "reviews" ? "border-b-2 border-black" : ""
            }`}
          >
            Reviews
          </button>
        </div>
        {activeTab === "description" ? (
          <div className="flex flex-col gap-4 px-6 py-6 text-sm text-gray-500 border">
            <p> {productData.detailedDescription} </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 px-6 py-6 text-sm text-gray-500 border">
            {/* Integrating the Review component */}
            <Review productId={productId} />
          </div>
        )}
      </div>

      {/* ------ Similar Products Section ------- */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
