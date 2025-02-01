import express from "express";
import { addNewReview,getReviews , updateReview, deleteReview} from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/addnewreview", addNewReview);

reviewRouter.get("/", getReviews); 

reviewRouter.put("/updateReview", updateReview);


reviewRouter.delete("/deleteReview", deleteReview);


export default reviewRouter;