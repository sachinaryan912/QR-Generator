import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white text-center px-4">
      <h1 className="text-6xl font-bold text-yellow-400">404</h1>
      <p className="text-xl mt-4">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="mt-6 text-lg text-yellow-300 underline hover:text-yellow-500 transition">
        Go Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
