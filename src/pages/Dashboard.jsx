import React, { useEffect, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import { onAuthStateChanged } from "firebase/auth";
import { auth, database } from "../firebase";
import { ref, get } from "firebase/database";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import { Helmet } from "react-helmet";
import {
  FaGlobe, FaFont, FaEnvelope, FaInstagram, FaFacebook, FaTwitter,
  FaAddressCard, FaWifi, FaSms
} from "react-icons/fa";
import QRGenerator from "../components/QRGenerator";
import QRGeneratorPremium from "../components/QRGeneratorPremium";

// Default QR type content
const qrTypeDefaults = {
  URL: {label:"URL", icon: <FaGlobe />, data: "https://pixqr.com" },
  Text: {label:"Text", icon: <FaFont />, data: "Hello, PixQR!" },
  Email: {label:"Email", icon: <FaEnvelope />, data: "pixqr@gmail.com" },
  Instagram: {label:"Instagram",icon: <FaInstagram />, data: "https://instagram.com/" },
  Facebook: {label:"Facebook", icon: <FaFacebook />, data: "https://facebook.com/" },
  Twitter: {label:"Twitter", icon: <FaTwitter />, data: "https://twitter.com/" },
  vCard: {label:"vCard", icon: <FaAddressCard />, data: "BEGIN:VCARD\nFN:PixQR\nEMAIL:pixqr@gmail.com" },
  WiFi: {label:"WiFi",icon: <FaWifi />, data: "WIFI:T:WPA;S:PixQR;P:password;;" },
  SMS: { label:"SMS",icon: <FaSms />, data: "sms:+1234567890:Hi!" },
};

const Dashboard = () => {
  const qrRef = useRef(null);
  const [content, setContent] = useState(qrTypeDefaults["URL"].data);
  const [dotColor, setDotColor] = useState("#000");
  const [dotType, setDotType] = useState("square");
  const [logoFile, setLogoFile] = useState(null);
  const [selectedType, setSelectedType] = useState("URL");
  const [userData, setUserData] = useState(null);
  const [qrType, setQrType] = useState("URL");
  const navigate = useNavigate();

  const qrCode = useRef(
    new QRCodeStyling({
      width: 250,
      height: 250,
      data: content,
      dotsOptions: { color: dotColor, type: dotType },
      backgroundOptions: { color: "#fff" },
      imageOptions: { crossOrigin: "anonymous", margin: 5 },
    })
  ).current;

  // Append QR Code only once
  useEffect(() => {
    const timer = setTimeout(() => {
      if (qrRef.current && qrRef.current.childElementCount === 0) {
        qrCode.append(qrRef.current);
        console.log("✅ QR code appended");
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Update QR when content or styles change
  useEffect(() => {
    const imageUrl = logoFile ? URL.createObjectURL(logoFile) : "";
    console.log("✅ Updating QR code with:", content);
    qrCode.update({
      data: content,
      dotsOptions: { color: dotColor, type: dotType },
      image: imageUrl,
    });

    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
  }, [content, dotColor, dotType, logoFile]);

  const pickType = (type) => {
    setSelectedType(type);
    setContent(qrTypeDefaults[type].data);
    setQrType(qrTypeDefaults[type].label);
  };

  const onLogoChange = (e) => {
    const file = e.target.files[0];
    setLogoFile(file);
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (u) {
        const snap = await get(ref(database, `users/${u.uid}`));
        if (snap.exists()) setUserData(snap.val());
      } else {
        navigate("/login");
      }
    });
    return unsub;
  }, [navigate]);

  if (!userData) return <Loader text="Loading dashboard..." />;

  return (
    <>
      <Helmet><title>PixQR Dashboard</title></Helmet>
      <div className="dashboard-container">
        <div className="bg-overlay" />
        <Navbar userData={userData} />

        <main className="main-content">
          <h1>Generate & Publish <span className="highlight">Dynamic</span> QR Codes</h1>
          <p className="description">Customize your QR code with style, logo, pattern, and color.</p>

          <div className="controls-grid">
            {/* QR Type */}
            <div className="card type-card">
              <h3>QR Type</h3>
              <div className="grid-two">
                {Object.entries(qrTypeDefaults).map(([t, { icon }]) => (
                  <div
                    key={t}
                    className={`type-chip ${selectedType === t ? "active" : ""}`}
                    onClick={() => pickType(t)}
                  >
                    {icon}<span>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* QR Input & Preview */}
             <QRGeneratorPremium qrType={qrType}/>
            {/* <div className="card input-card">
              <input
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="url-input"
                placeholder="Enter URL or text..."
              />
              <div ref={qrRef} className="qr-canvas" />
            </div> */}

            {/* Options */}
            {/* <div className="card options-card">
              <h3>Color</h3>
              <div className="color-options">
                {["#000","#f00","#0f0","#00f","#ffa500","#800080","#0ff"].map(c => (
                  <button
                    key={c}
                    className="color-circle"
                    style={{ background: c }}
                    onClick={() => setDotColor(c)}
                  />
                ))}
              </div>

              <div className="premium-chips">
                {["gold","silver","bronze"].map(p => (
                  <div
                    key={p}
                    className={`premium-chip ${p}`}
                    onClick={() => setDotColor(`url(#${p})`)}
                  >
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </div>
                ))}
              </div>

              <h3>Pattern</h3>
              <div className="pattern-options">
                {["square","dots","rounded"].map(pt => (
                  <div
                    key={pt}
                    className={`pattern-chip ${dotType === pt ? "active" : ""}`}
                    onClick={() => setDotType(pt)}
                  >{pt}</div>
                ))}
              </div>

              <h3>Logo (optional)</h3>
              <input type="file" accept="image/*" onChange={onLogoChange} />
            </div> */}
          </div>

          {/* Gradients for premium colors */}
          {/* <svg width="0" height="0">
            <defs>
              <linearGradient id="gold"><stop stopColor="#FFD700"/><stop offset="1" stopColor="#FFA500"/></linearGradient>
              <linearGradient id="silver"><stop stopColor="#C0C0C0"/><stop offset="1" stopColor="#A9A9A9"/></linearGradient>
              <linearGradient id="bronze"><stop stopColor="#CD7F32"/><stop offset="1" stopColor="#8B4513"/></linearGradient>
            </defs>
          </svg> */}
        </main>
      </div>
    </>
  );
};

export default Dashboard;
