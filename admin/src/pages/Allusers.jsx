import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Allusers = () => {
  const token = localStorage.getItem("token");
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${backendURL}/api/user/allusers`,
          {
            token,
          },
          { headers: { token } }
        );
        if (response.data.success) {
          setDocuments(response.data.documents);
          toast.success("Update successfully");
        } else {
          toast.error(error.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token, backendURL]);

  return (
    <>
      <p className="mb-2">User Accounts List</p>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50  dark:text-gray-400">
            <tr className="border border-gray-300">
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Cart&nbsp;&nbsp;&nbsp;Items
              </th>
            </tr>
          </thead>
          <tbody className="bg-white border-b">
            {documents.map((doc) => (
              <tr className="border border-gray-300 border-r-0" key={doc._id}>
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {doc._id}
                </td>
                <td scope="col" className="px-6 py-3">
                  {doc.name}
                </td>
                <td scope="col" className="px-6 py-3">
                  {doc.email}
                </td>
                <td scope="col" className="px-6 py-3">
                  {Object.keys(doc.cartData).map((key) => (
                    <div key={key} className="mb-2">
                      {key}
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Allusers;
