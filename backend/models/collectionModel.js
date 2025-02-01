import mongoose from "mongoose";

const CollectionSchema = new mongoose.Schema({
  category: { type: String, required: false },
  subCategory: { type: String, required: false },
});

const CollectionModel = mongoose.model("Collection", CollectionSchema);

export default CollectionModel;
