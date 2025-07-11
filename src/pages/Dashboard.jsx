import React, { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, database } from "../firebase";
import { ref, get } from "firebase/database";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import { FaBolt, FaChevronDown, FaQrcode } from "react-icons/fa";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const snapshot = await get(ref(database, `users/${user.uid}`));
        if (snapshot.exists()) {
          setUserData(snapshot.val());
        }
      } else {
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <nav className="navbar">
        <div className="logo">PixQR</div>
        {userData && (
          <div className="nav-right">
            <div className="token">
              <FaBolt /> {userData.token}
            </div>
            <div
              className="user-info"
              onMouseEnter={() => setShowPopup(true)}
              onMouseLeave={() => setShowPopup(false)}
            >
              {userData.username}
              <FaChevronDown className="dropdown-icon" />
              {showPopup && (
                <div className="user-popup">
                  <p><strong>Level:</strong> {userData.level}</p>
                  <p><strong>Since:</strong> {new Date(userData.createdAt).toLocaleDateString()}</p>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      <main className="main-section">
        <h2 className="section-title">Generate QR Codes</h2>
        <div className="card-grid">
          {["URL", "Text", "Phone", "Email"].map((type) => (
            <div className="card glass-card" key={type}>
              <img src={`../assets/${type}.png`} alt={`${type} icon`} />
              <h3>{type}</h3>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
