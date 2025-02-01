import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendURL } from "../App";
import { toast } from "react-toastify";

const ListCategory = ({ token }) => {
  const [collections, setCollections] = useState([]);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [editId, setEditId] = useState(null);

  // Fetch all categories
  const fetchCollections = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/collection`);
      setCollections(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch collections");
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  // Update a category or subcategory
  const handleUpdate = async (e) => {
    e.preventDefault();

    // Dynamically build the payload based on provided inputs
    const updatePayload = {};
    if (category.trim()) updatePayload.category = category;
    if (subCategory.trim()) updatePayload.subCategory = subCategory;

    try {
      const response = await axios.put(
        `${backendURL}/api/collection/${editId}`,
        updatePayload,
        { headers: { token } }
      );

      toast.success(response.data.message);
      fetchCollections();
      setCategory("");
      setSubCategory("");
      setEditId(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update collection");
    }
  };

  // Delete a category
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;
    try {
      const response = await axios.delete(
        `${backendURL}/api/collection/${id}`,
        {
          headers: { token },
        }
      );
      toast.success(response.data.message);
      fetchCollections();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete category");
    }
  };

  // Populate the form for editing a category
  const handleEdit = (collection) => {
    setCategory(collection.category || "");
    setSubCategory(collection.subCategory || "");
    setEditId(collection._id);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Categories</h2>

      {/* Edit Form */}
      {editId && (
        <form onSubmit={handleUpdate} className="flex flex-col gap-3 mb-5">
          <div>
            <label>Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-300 p-2 rounded"
              placeholder="Update category"
            />
          </div>
          <div>
            <label>SubCategory</label>
            <input
              type="text"
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              className="border border-gray-300 p-2 rounded"
              placeholder="Update subcategory"
            />
          </div>
          <button
            type="submit"
            className="py-2 px-4 bg-blue-500 text-white rounded"
          >
            Update Collection
          </button>
        </form>
      )}

      {/* Categories Table */}
      <table className="mt-5 w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Category</th>
            <th className="border border-gray-300 p-2">SubCategory</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {collections.length > 0 ? (
            collections.map((collection) => (
              <tr key={collection._id}>
                <td className="border border-gray-300 p-2">
                  {collection.category}
                </td>
                <td className="border border-gray-300 p-2">
                  {collection.subCategory}
                </td>
                <td className="border border-gray-300 p-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(collection)}
                    className="py-1 px-3 bg-yellow-500 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(collection._id)}
                    className="py-1 px-3 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center p-4">
                No categories found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListCategory;
