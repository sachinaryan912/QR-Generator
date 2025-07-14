import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Simple_Navbar.css";

const Simple_Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="simple-navbar">
      <img
        src="/logo.png" // Replace with your actual logo
        alt="PixQR Logo"
        className="navbar-logo"
        onClick={() => navigate("/")}
      />
    </nav>
  );
};

export default Simple_Navbar;
