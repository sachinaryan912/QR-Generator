// src/components/Loader.jsx
import React from "react";
import "../styles/Loader.css";

const Loader = ({ text = "Please wait! Fetching data..." }) => {
  return (
    <div className="qr-loader-container">
      <div className="qr-frame">
        <div className="qr-scan-line"></div>
      </div>
      <p className="qr-loading-text">{text}</p>
    </div>
  );
};

export default Loader;
