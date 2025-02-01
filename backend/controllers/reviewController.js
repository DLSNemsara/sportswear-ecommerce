import reviewModel from "../models/reviewModel.js";
import productModel from "../models/productModel.js";

const getReviews = async (req, res) => {
  try {
    const { productId } = req.query;
    const reviews = await reviewModel.find({ productId });
    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const addNewReview = async (req, res) => {
  try {
    const { productId, email, rating, comment } = req.body;

    const exists = await productModel.findOne({ _id: productId });
    if (exists) {
      const newReview = new reviewModel({
        productId,
        userEmail: email,
        rating,
        comment,
      });

      const savedReview = await newReview.save();

      if (savedReview) {
        return res.status(201).json({
          success: true,
          message: "Review added successfully",
          review: savedReview,
        });
      } else {
        res
          .status(500)
          .json({ success: false, message: "Failed to save the review" });
      }
    } else {
      res.status(500).json({ success: false, message: "Not in product List" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateReview = async (req, res) => {
  try {
    const { productId, email, rating, comment } = req.body;

    const review = await reviewModel.findOne({ productId, userEmail: email });
    if (review) {
      review.rating = rating || review.rating;
      review.comment = comment || review.comment;

      const updatedReview = await review.save();

      return res.status(200).json({
        success: true,
        message: "Review updated successfully",
        review: updatedReview,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


const deleteReview = async (req, res) => {
  try {
    const { productId, email } = req.body;

    const review = await reviewModel.findOneAndDelete({ productId, userEmail: email });

    if (review) {
      return res.status(200).json({
        success: true,
        message: "Review deleted successfully",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};




export { addNewReview, getReviews, updateReview, deleteReview };
