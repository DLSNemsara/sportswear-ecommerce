import React, { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import { FaStar, FaRegStar, FaEdit, FaTrashAlt } from "react-icons/fa";
import StarRating from "./StarRating";

const Review = ({ productId }) => {
  const { backendURL } = useContext(ShopContext);
  const [reviews, setReviews] = useState([]);
  const email = localStorage.getItem("email");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [editingReview, setEditingReview] = useState(null);
  const [editRating, setEditRating] = useState(0);
  const [editComment, setEditComment] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${backendURL}/api/reviews?productId=${productId}`
        );
        if (response.data.success) {
          setReviews(response.data.reviews);
        }
      } catch (error) {
        console.error("Failed to fetch reviews", error);
      }
    };
    fetchReviews();
  }, [backendURL, productId]);

  const handleReviewSubmit = async (event) => {
    event.preventDefault();
    if (email) {
      try {
        const reviewdata = await axios.post(
          `${backendURL}/api/reviews/addnewreview`,
          {
            productId,
            email,
            rating,
            comment,
          }
        );
        setReviews((prevReviews) => [...prevReviews, reviewdata.data.review]);
        setRating(0);
        setComment("");
        toast.success("Review added successfully");
      } catch (error) {
        console.error("Failed to submit review", error);
      }
    } else {
      toast.info("You must be logged in to review");
    }
  };

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `${backendURL}/api/reviews/updateReview`,
        {
          productId,
          email,
          rating: editRating,
          comment: editComment,
        }
      );
      if (response.data.success) {
        setReviews((prevReviews) =>
          prevReviews.map((r) =>
            r._id === editingReview._id ? response.data.review : r
          )
        );
        setEditingReview(null);
        setEditRating(0);
        setEditComment("");
        toast.success("Review updated successfully");
      }
    } catch (error) {
      console.error("Failed to update review", error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const response = await axios.delete(
        `${backendURL}/api/reviews/deleteReview`,
        {
          data: { productId, email },
        }
      );
      if (response.data.success) {
        setReviews((prevReviews) =>
          prevReviews.filter((r) => r._id !== reviewId)
        );
        toast.success("Review deleted successfully");
      }
    } catch (error) {
      console.error("Failed to delete review", error);
      toast.error("Failed to delete review");
    }
  };

  const handleEditClick = (review) => {
    setEditingReview(review);
    setEditRating(review.rating);
    setEditComment(review.comment);
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-bold text-gray-800">Reviews</h3>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white p-4 rounded-lg shadow-md border"
            >
              {editingReview && editingReview._id === review._id ? (
                <form onSubmit={handleUpdateSubmit}>
                  <StarRating rating={editRating} setRating={setEditRating} />
                  <textarea
                    value={editComment}
                    onChange={(e) => setEditComment(e.target.value)}
                    placeholder="Edit your review"
                    className="w-full px-4 py-2 border rounded-md mt-2"
                  ></textarea>
                  <button className="px-6 py-2 mt-4 text-white bg-green-600 rounded-lg">
                    Update Review
                  </button>
                </form>
              ) : (
                <>
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-semibold text-gray-700">
                      {review.userEmail}
                    </p>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, index) => (
                        <span key={index}>
                          {index < review.rating ? (
                            <FaStar className="text-orange-500" />
                          ) : (
                            <FaRegStar className="text-gray-300" />
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 mt-2">{review.comment}</p>
                  {review.userEmail === email && (
                    <div className="flex gap-4 mt-2">
                      <button
                        onClick={() => handleEditClick(review)}
                        className="text-blue-500 flex items-center"
                      >
                        <FaEdit className="mr-1" /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteReview(review._id)}
                        className="text-red-500 flex items-center"
                      >
                        <FaTrashAlt className="mr-1" /> Delete
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-600">
            No reviews yet. Be the first to leave a review!
          </p>
        )}
      </div>

      <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
        <h4 className="text-lg font-bold text-gray-800">Leave a Review</h4>
        <form onSubmit={handleReviewSubmit}>
          <StarRating rating={rating} setRating={setRating} />
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review"
            className="w-full px-4 py-2 border rounded-md mt-2"
          ></textarea>
          <button className="px-6 py-2 mt-4 text-white bg-black rounded-lg">
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default Review;
