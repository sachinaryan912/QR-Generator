import React, { useEffect, useState, useRef } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, database } from "../firebase";
import { ref, get } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { FaBolt, FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import "../styles/Dashboard.css";
import { motion, AnimatePresence } from "framer-motion";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showList, setShowList] = useState(true);
const [isMobile, setIsMobile] = useState(false);


useEffect(() => {
  const checkMobile = () => setIsMobile(window.innerWidth <= 768);
  checkMobile();
  window.addEventListener("resize", checkMobile);
  return () => window.removeEventListener("resize", checkMobile);
}, []);

useEffect(() => {
  if (!isMobile) {setShowList(true); setMenuOpen(false)};
}, [isMobile]);

  const cardData = [
    { title: "URL", description: "Redirect users to any website", img: "/assets/URL.png" },
    { title: "Text", description: "Display static text/message", img: "/assets/Text.png" },
    { title: "Email", description: "Pre-filled recipient & subject", img: "/assets/Email.png" },
    { title: "Wi-Fi", description: "Share network SSID & password instantly", img: "/assets/WiFi.png" },
    { title: "vCard", description: "Share business/contact info in 1 scan", img: "/assets/vCard.png" },
    { title: "SMS", description: "Pre-filled message with phone number", img: "/assets/SMS.png" },
    { title: "Location", description: "Share Google Maps or geo-coordinates", img: "/assets/Location.png" },
  ];
  
  

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

  // ✅ Detect click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setShowPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="dashboard">
      {/* <nav className="navbar">
        <div className="logo">PixQR</div>
        {userData && (
          <div className="nav-right">
            <div className="token">
              <FaBolt /> {userData.token}
            </div>

            <div className="user-dropdown-wrapper" ref={popupRef}>
              <div className="user-info" onClick={() => setShowPopup((prev) => !prev)}>
                {userData.username}
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
                    <button onClick={handleLogout}>Logout</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </nav> */}

<nav className="navbar">
  <div className="logo">PixQR</div>

  <div className="burger-icon" onClick={() => setMenuOpen(!menuOpen)}>
  {menuOpen ? <FaTimes /> : <FaBars />}
</div>


  {/* Desktop & Mobile Menu */}
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
            <button onClick={handleLogout}>Logout</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </div>
</nav>
      <main className="main-section">
        
      <div className="dashboard-intro">
      <h2>Welcome to PixQR 👋</h2>
  <p>
    Create beautifully branded and functional QR codes for every need — from sharing contact details to Wi-Fi,
    locations, and more. Whether you're a content creator, business owner, or enthusiast, PixQR makes QR generation
    stylish, fast, and secure.
  </p>

  {isMobile && (
    <button className="toggle-btn" onClick={() => setShowList(!showList)}>
      {showList ? "Hide Details ▲" : "Show Details ▼"}
    </button>
  )}

  <div className={`collapsible-list ${showList ? "open" : ""}`}>
    <ul>
    <li>🔐 <strong>Privacy first:</strong> All your data is <strong>end-to-end encrypted</strong>. We never store or track your QR content.</li>
    
    <li>⚡ <strong>Have tokens?</strong> Unlock advanced QR types like vCards, Wi-Fi, SMS, and premium designs.</li>
    <li>🎨 <strong>Premium perks:</strong> Add logos, gradients, background images, and more customization options.</li>
    <li>🆓 <strong>Free features:</strong> Basic QR generation (URL, Text) is available to everyone after login.</li>
    <li>🪪 <strong>Login Required:</strong> Access to PixQR's features requires login to manage your tokens, designs, and saved QR codes securely.</li>
 
    </ul>
  </div>
</div>



<h2 className="section-title">Generate QR Codes</h2>

        <div className="card-grid">
        {cardData.map((card) => (
          <motion.div
            className="card glass-card"
            key={card.title}
            whileHover="hovered"
            initial="rest"
            animate="rest"
          >
            <motion.img
              src={card.img}
              alt={`${card.title} icon`}
              className="card-icon"
              variants={{
                hovered: {
                  rotate: [0, -6, 6, -6, 0],
                  transition: { duration: 0.6, ease: "easeInOut" },
                },
                rest: { rotate: 0 },
              }}
            />
            <h3>{card.title}</h3>
            <p className="card-description">{card.description}</p>
          </motion.div>
        ))}
        </div>


      </main>
    </div>
  );
};

export default Dashboard;
