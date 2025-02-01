import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes, Navigate } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./components/Login";
import Allusers from "./pages/Allusers";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

import AddCategory from "./pages/Addcategory";
import ListCategory from "./pages/ListCategory";

export const currency = "$";
export const backendURL = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }
  }, [token]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/add" element={<Add setToken={setToken} />} />
                <Route path="/list" element={<List setToken={setToken} />} />
                <Route
                  path="/addcategory"
                  element={<AddCategory setToken={setToken} />}
                />
                <Route
                  path="/listcategory"
                  element={<ListCategory setToken={setToken} />}
                />
                <Route
                  path="/orders"
                  element={<Orders setToken={setToken} />}
                />
                <Route
                  path="/allusers"
                  element={<Allusers setToken={setToken} />}
                />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
