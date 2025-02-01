import Title from "../components/Title";
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";

const WishList = () => {
  const { backendURL, token, currency } = useContext(ShopContext);
  const [allWishlistItem, setAllWishlistItem] = useState([]);

  const removeFromWishlist = async (productId) => {
    if (!token) {
      toast.error("You must be logged in to remove items from your wishlist.");
      return;
    }
    try {
      const response = await axios.delete(`${backendURL}/api/wishlist/remove`, {
        data: { productId },
        headers: { token },
      });
      if (response.data.success) {
        toast.success("Removed item from wishlist!");
        loadWishlistData();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const loadWishlistData = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.get(`${backendURL}/api/wishlist/list`, {
        headers: { token },
      });
      if (response.data.success) {
        const allWishlistItems = response.data.wishlist.map((wishlistItem) => ({
          productId: wishlistItem.productId,
        }));
        setAllWishlistItem(allWishlistItems);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    loadWishlistData();
  }, [token]);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"WISHLIST"} />
      </div>

      <div className="mt-8">
        {allWishlistItem.length > 0 ? (
          allWishlistItem.map((item, index) => {
            const { productId } = item;
            return (
              <div
                key={index}
                className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
              >
                <div className="flex items-start gap-6">
                  <img
                    className="w-16 sm:w-20"
                    src={productId?.image?.[0] || "placeholder-image-url"}
                    alt={productId?.name || "Product"}
                  />
                  <div>
                    <p className="text-xs font-medium sm:text-lg">
                      {productId?.name || "Unknown Product"}
                    </p>
                    <div className="flex items-center gap-5 mt-2">
                      <p>
                        {currency}
                        {productId?.price || "0.00"}
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeFromWishlist(productId._id)}
                  className="text-sm text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            );
          })
        ) : (
          <p>No items in your wishlist</p>
        )}
      </div>
    </div>
  );
};

export default WishList;
