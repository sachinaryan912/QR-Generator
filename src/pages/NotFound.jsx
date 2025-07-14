// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/NotFound.css"; // 👈 Import the custom CSS
import notFoundImg from "../assets/not-found.png"; // Replace with your image path

const NotFound = () => {
  return (
    <div className="notfound-container">
      <img src={notFoundImg} alt="404 Not Found" className="notfound-image" />
      <h1 className="notfound-title">404</h1>
      <p className="notfound-text">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="notfound-link">
        Go Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
