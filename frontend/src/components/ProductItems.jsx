import React, { useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useState(ShopContext);

  return (
    <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
      <div className="overflow-hidden">
        <img
          className="transition ease-in-out hover:scale-110"
          src={image[0]}
          alt=""
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium">
        {currency}$ {price}
      </p>
    </Link>
  );
};

export default ProductItem;
