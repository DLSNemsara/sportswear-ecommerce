import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { ShopContext } from "../context/ShopContext.jsx";
import { useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const WishlistButton = ({ productId, isInitiallyInWishlist }) => {
  const [isInWishlist, setIsInWishlist] = useState(isInitiallyInWishlist);
  const { backendURL, token } = useContext(ShopContext);

  const toggleWishlist = async () => {
    if (!token) {
      toast.error("You must be logged in to add items to your wishlist.");
      return;
    }
    if (isInWishlist) {
      try {
        const response = await axios.delete(
          `${backendURL}/api/wishlist/${productId}`,
          { headers: { token } }
        );
        if (response.data.success) {
          toast.success("Removed from wishlist!");
          setIsInWishlist(false);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    } else {
      try {
        const response = await axios.post(
          `${backendURL}/api/wishlist/add`,
          { productId },
          { headers: { token } }
        );

        if (response.data.success) {
          toast.success("Added to wishlist!");
          setIsInWishlist(true);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  return (
    <button onClick={toggleWishlist} className="text-2xl">
      {isInWishlist ? <FaHeart color="black" /> : <FaRegHeart />}
    </button>
  );
};

export default WishlistButton;