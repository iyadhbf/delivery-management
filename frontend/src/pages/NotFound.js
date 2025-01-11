import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">404 - Page Not Found</h1>
      <p className="mt-2 text-gray-600">Sorry, the page you are looking for does not exist.</p>
      <Link
        to="/login"
        className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
      >
        Go to Login
      </Link>
    </div>
  );
};

export default NotFound;
