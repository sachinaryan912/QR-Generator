import React, { useEffect, useState, useRef } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, database } from "../firebase";
import { ref, get } from "firebase/database";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import { Helmet } from "react-helmet"; // for SEO

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
  { title: "URL", description: "Redirect users to any website", img: "/assets/URL.png", path: "/generate/url" },
  { title: "Text", description: "Display static text/message", img: "/assets/Text.png", path: "/generate/text" },
  { title: "Email", description: "Pre-filled recipient & subject", img: "/assets/Email.png", path: "/generate/email" },
  { title: "Wi-Fi", description: "Share network SSID & password instantly", img: "/assets/WiFi.png", path: "/generate/wifi" },
  { title: "vCard", description: "Share business/contact info in 1 scan", img: "/assets/vCard.png", path: "/generate/vcard" },
  { title: "SMS", description: "Pre-filled message with phone number", img: "/assets/SMS.png", path: "/generate/sms" },
  { title: "Location", description: "Share Google Maps or geo-coordinates", img: "/assets/Location.png", path: "/generate/location" },
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

  if (!userData) {
    return <Loader text="Please wait! Fetching data..."/>;
  }

  return (

    <>
    <Helmet>
  <title>Dashboard | PixQR - Generate Smart QR Codes</title>
  <meta
    name="description"
    content="Your personal PixQR dashboard to generate, customize, and manage secure QR codes for URL, Text, SMS, vCard, and more. 100% private & encrypted."
  />
  <meta
    name="keywords"
    content="PixQR dashboard, QR generator dashboard, manage QR codes, create QR code, custom QR, branded QR generator, PixQR user panel"
  />
  <meta name="robots" content="index, follow" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="canonical" href="https://pixqr.online/dashboard" />

  {/* Open Graph */}
  <meta property="og:title" content="Dashboard | PixQR - Generate QR Codes" />
  <meta property="og:description" content="Access your PixQR dashboard to generate stylish QR codes, manage tokens, and customize designs with encryption and ease." />
  <meta property="og:url" content="https://pixqr.online/dashboard" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://pixqr.online/assets/preview-banner.png" />

  {/* Twitter Card */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Dashboard | PixQR - Generate Smart QR Codes" />
  <meta name="twitter:description" content="Customize and manage your QR codes using the PixQR Dashboard. Stylish, secure, and feature-rich." />
  <meta name="twitter:image" content="https://pixqr.online/assets/preview-banner.png" />
</Helmet>

     <div className="dashboard">
      <Navbar userData={userData} />
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
    <li>🔐 <strong>Privacy first:</strong> All your data is <strong>end-to-end encrypted</strong>. We never track your QR content.</li>
    
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
            onClick={() => navigate(card.path)}
            style={{ cursor: "pointer" }}
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
    </>
    
    
   
  );
};

export default Dashboard;
