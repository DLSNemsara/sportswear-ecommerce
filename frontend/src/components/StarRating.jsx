import React from "react";

const StarRating = ({ rating, setRating }) => {
  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          onClick={() => handleStarClick(index)}
          style={{
            cursor: "pointer",
            fontSize: "24px",
            color: index < rating ? "orange" : "gray",
            textShadow: "0 0 5px yellow",
          }}
        >
          {index < rating ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
};

export default StarRating;
