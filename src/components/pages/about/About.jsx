import React from "react";
import { Link } from "react-router";

const About = () => {
  return (
    <div className="w-full flex items-center justify-center font-['Inter'] p-4 sm:p-6">
      <div className="bg-white rounded-lg shadow-xl p-8 sm:p-12 lg:p-16 text-center  w-full">
        <div className="mb-8 flex flex-col items-center justify-center">
          <div className="text-pink-500 mb-4">
            <img
              src="https://placehold.co/128x128/fbcfe8/ec4899?text=Character"
              alt="Placeholder Character"
              className="w-32 h-32 mx-auto"
            />
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-gray-700 w-16 h-16 sm:w-20 sm:h-20 -mt-8 -mr-16"
          >
            <path
              fillRule="evenodd"
              d="M19.78 14.881l-4.71-4.71a.75.75 0 00-.01.953l.972.972a.75.75 0 010 1.06l-2.583 2.583a.75.75 0 00-.01.953l.972.972a.75.75 0 010 1.06L9.853 21.28a.75.75 0 01-1.06 0l-.972-.972a.75.75 0 00-.953-.01l-2.583 2.583a.75.75 0 01-1.06 0l-.972-.972a.75.75 0 00-.953-.01L.881 19.78a.75.75 0 010-1.06L18.72 2.22a.75.75 0 011.06 0l.972.972a.75.75 0 00.953.01l2.583-2.583a.75.75 0 011.06 0l.972.972a.75.75 0 00.01.953l-2.583 2.583a.75.75 0 01-.953.01l-.972-.972a.75.75 0 00-1.06 0zM12 18a6 6 0 100-12 6 6 0 000 12z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {/* Error message */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-6">
          Error 404
        </h1>

        {/* Go Home button */}
        <Link to={"/"}>
          <button className="inline-flex items-center px-6 py-3 bg-lime-500 text-white font-semibold rounded-md shadow-lg hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 transition-colors duration-200 text-lg">
            Go Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default About;
