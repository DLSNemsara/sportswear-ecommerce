import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Hero = () => {
  const dismissElement = () => {
    const element = document.getElementById("bottom-banner");

    if (element) {
      element.style.display = "none";
    }
  };

  return (
    <div className="flex flex-col sm:flex-row border border-gray-400">
      <img className="w-full sm:w-full" src={assets.hero_img} alt="" />

      <div
        id="bottom-banner"
        tabIndex="-1"
        className="fixed bottom-0 start-0 z-50 flex justify-between w-full p-4 border-t border-gray-200 bg-gray-50 "
      >
        <div className="flex items-center mx-auto">
          <p className="flex items-center text-sm font-normal text-gray-500 ">
            <span className="inline-flex p-1 me-3 bg-gray-200 rounded-full w-6 h-6 items-center justify-center">
              <svg
                className="w-3.5 h-3.5 text-white dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M18.435 7.546A2.32 2.32 0 0 1 17.7 5.77a3.354 3.354 0 0 0-3.47-3.47 2.322 2.322 0 0 1-1.776-.736 3.357 3.357 0 0 0-4.907 0 2.281 2.281 0 0 1-1.776.736 3.414 3.414 0 0 0-2.489.981 3.372 3.372 0 0 0-.982 2.49 2.319 2.319 0 0 1-.736 1.775 3.36 3.36 0 0 0 0 4.908A2.317 2.317 0 0 1 2.3 14.23a3.356 3.356 0 0 0 3.47 3.47 2.318 2.318 0 0 1 1.777.737 3.36 3.36 0 0 0 4.907 0 2.36 2.36 0 0 1 1.776-.737 3.356 3.356 0 0 0 3.469-3.47 2.319 2.319 0 0 1 .736-1.775 3.359 3.359 0 0 0 0-4.908ZM8.5 5.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm3 9.063a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm2.207-6.856-6 6a1 1 0 0 1-1.414-1.414l6-6a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span className="sr-only">Discount</span>
            </span>
            <span>
              Get 5% commission per sale{" "}
              <Link
                href="/"
                className="flex items-center ms-0 text-sm font-medium text-blue-600 md:ms-1 md:inline-flex dark:text-blue-500 hover:underline"
              >
                Become a partner{" "}
                <svg
                  className="w-3 h-3 ms-2 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path stroke="currentColor" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </Link>
            </span>
          </p>
        </div>
        <div className="flex items-center">
          <button
            data-dismiss-target="#bottom-banner"
            type="button"
            className="flex-shrink-0 inline-flex justify-center w-7 h-7 items-center text-blue-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 "
            onClick={dismissElement}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close banner</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
