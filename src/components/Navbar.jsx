// src/components/Navbar.jsx
import React, { useRef, useState, useEffect } from "react";
import { FaBolt, FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const Navbar = ({ userData }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const popupRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const handleOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setShowPopup(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">PixQR</div>

      <div className="burger-icon" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <div className={`nav-right ${menuOpen ? "open" : ""}`}>
        <div className="token">
          <FaBolt /> {userData?.token}
        </div>

        <div className="user-dropdown-wrapper" ref={popupRef}>
          <div className="user-info" onClick={() => setShowPopup((prev) => !prev)}>
            {userData?.username}
            <FaChevronDown className={`dropdown-icon ${showPopup ? "rotate" : ""}`} />
          </div>

          <AnimatePresence>
            {showPopup && (
              <motion.div
                className="user-popup"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <p><strong>Level:</strong> {userData.level}</p>
                <p><strong>Since:</strong> {new Date(userData.createdAt).toLocaleDateString()}</p>
                
                {/* <hr /> */}
                <p><a href="/terms" className="popup-link">📜 Terms & Conditions</a></p>
                <p><a href="/privacy" className="popup-link">🔒 Privacy Policy</a></p>

                <button onClick={handleLogout}>Logout</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
