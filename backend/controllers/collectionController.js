import Collection from "../models/collectionModel.js";

// Create a new collection
export const createCollection = async (req, res) => {
  try {
    const newCollection = new Collection(req.body);
    await newCollection.save();
    res.status(201).json({
      message: "Category or sub-category added successfully",
      newCollection,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all collections
export const getCollections = async (req, res) => {
  try {
    const collections = await Collection.find();
    res.status(200).json(collections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a collection by ID
export const getCollectionById = async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id);
    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }
    res.status(200).json(collection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a collection
export const updateCollection = async (req, res) => {
  try {
    const updates = {};
    if (req.body.category) updates.category = req.body.category;
    if (req.body.subCategory) updates.subCategory = req.body.subCategory;

    const updatedCollection = await Collection.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true }
    );

    if (!updatedCollection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    res.status(200).json({
      message: "Collection updated successfully",
      updatedCollection,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a collection
export const deleteCollection = async (req, res) => {
  try {
    const deletedCollection = await Collection.findByIdAndDelete(req.params.id);
    if (!deletedCollection) {
      return res.status(404).json({ message: "Collection not found" });
    }
    res.status(200).json(deletedCollection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
