// LandingPage.jsx

import React, { useState, useEffect } from "react";
import "../styles/Landing.css";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { FaQrcode, FaSearch, FaLink, FaSms, FaEnvelope, FaUserAlt } from "react-icons/fa";
import FAQAccordion from "../components/FAQAccordion";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import HowItWorks from "../components/HowItWorks";
import ComingSoonDialog from "../components/ComingSoonDialog";



const tabOptions = [
  { label: "URL", icon: <FaLink /> },
  { label: "Text", icon: <FaSms /> },
  { label: "Email", icon: <FaEnvelope /> },
  { label: "vCard", icon: <FaUserAlt /> },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("URL");
  const [showDialog, setShowDialog] = useState(false);

useEffect(() => {
  const timer = setTimeout(() => {
    setShowDialog(true);
  }, 1000); // opens after 1 second

  return () => clearTimeout(timer);
}, []);


  return (
    <>
      <Helmet>
      <title>PixQR | Free & Premium Smart QR Code Generator</title>

      <meta
        name="description"
        content="PixQR is a powerful online QR code generator to create beautiful, custom, and branded QR codes. Generate QR codes for URL, Wi-Fi, vCard, Text, and more. 100% secure and end-to-end encrypted."
      />

      <meta
        name="keywords"
        content="QR code generator, custom QR codes, create QR online, QR code for Wi-Fi, vCard QR, secure QR generator, branded QR codes, PixQR, pixar, QR code design, free QR codes, premium QR codes, online QR code maker, generate QR code, stylish QR codes"
      />

      <meta name="robots" content="index, follow" />

      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <link rel="canonical" href="https://pixqr.online/" />

      <meta property="og:title" content="PixQR | Smart QR Code Generator" />
      <meta
        property="og:description"
        content="Create stunning QR codes with PixQR. Support for URL, Email, Wi-Fi, SMS, Location, vCard & more. Free and premium options."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://pixqr.online/" />
      <meta property="og:image" content="https://pixqr.online/assets/preview-banner.png" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="PixQR | Smart QR Code Generator" />
      <meta
        name="twitter:description"
        content="Generate secure, stunning QR codes with PixQR. Simple. Stylish. Secure."
      />
      <meta name="twitter:image" content="https://pixqr.online/assets/preview-banner.png" />
    </Helmet>

      <div className="landing-container" style={{ backgroundImage: `url('/assets/qr-bg1.jpeg')` }}>
        <div className="landing-overlay">
        <div className="landing-content">
  <div className="logo-data">
    <img src="/logo.png" alt="logo" />
  </div>

  <p className="landing-subtitle">
    Instantly create stunning, secure & scannable QR Codes for your website, portfolio, product, or brand.
    PixQR makes it simple to customize QR codes for URLs, texts, emails, and more – with encryption & style.
  </p>

  <div className="landing-buttons">
    <button className="btn-filled" onClick={() => navigate("/generate")}>
      <img src="/assets/qr-code-black.png" alt="Generate QR" className="btn-icon-img" style={{color: "white"}}/>
      <span>Generate QR</span>
    </button>
    <button className="btn-outline-golden">
      <img src="/assets/join-ic.png" alt="Scan QR" className="btn-icon-img" />
      <span>Sign up free</span>
    </button>
  </div>
</div>



    {/* 🟡 QR Generator Tabs Section */}
<div className="qr-gen-section">
  <h2 className="section-title">Generate Free QR Instantly</h2>

  {/* Animated iOS-Style Tab Buttons */}
  <motion.div
    className="tab-group-container"
    initial={{ y: 50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
  >
    <div className="tab-group">
      {tabOptions.map(({ label, icon }) => (
        <button
          key={label}
          onClick={() => setActiveTab(label)}
          className={`tab-btn-ios ${activeTab === label ? "active" : ""}`}
        >
          {activeTab === label && (
            <motion.div
              layoutId="tab-indicator"
              className="tab-indicator"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="tab-btn-content">
            {icon}&nbsp;{label}
          </span>
        </button>
      ))}
    </div>
  </motion.div>

  {/* Animated Tab Content */}
  <AnimatePresence mode="wait">
    <motion.div
      key={activeTab}
      className="tab-content"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <div className="qr-form-container">
        <h3>{activeTab} QR Generator Form</h3>
        <p>This is a placeholder form for {activeTab} generation.</p>
      </div>
    </motion.div>
  </AnimatePresence>
</div>


<div className="info-section">
  <h2>Why PixQR?</h2>
  <p>
    PixQR empowers creators, marketers, and businesses to design stunning and
    fully-customizable QR codes that reflect their brand identity. Whether
    you're sharing a URL, contact info, product details, or a Wi-Fi connection —
    PixQR helps you do it in style. Create high-converting QR codes in seconds,
    with options for both <strong>free</strong> and <strong>Premium</strong>  needs.
  </p>

  <div className="features-container">
    {/* Free Plan Box */}
    <div className="feature-box free-plan">
      <h3>🆓 Free Plan</h3>
      <ul>
        <li>Generate QR for URL & text</li>
        <li>Basic color customization</li>
        <li>High-quality PNG download</li>
        <li>Responsive & mobile-friendly design</li>
        <li>No login required</li>
      </ul>
    </div>

    {/* Premium Plan Box */}
    <div className="feature-box premium-plan">
      <div className="premium-icon">⚡</div>
      <h3>💰 Premium Upgrade</h3>
      <ul>
        <li>All Free Plan features included</li>
        <li>Generate QR for Phone, Email, SMS, Wi-Fi</li>
        <li>Add your brand’s logo inside the QR</li>
        <li>Gradient & advanced color styles</li>
        <li>Custom background (image/transparent)</li>
        <li>Token-based one-time premium unlock</li>
        <li>Perfect for startups, creators, professionals</li>
      </ul>
    </div>
  </div>
</div>

<HowItWorks />

          {/* 🟢 FAQ Accordion */}
          <FAQAccordion />

          {/* ⚫ Footer */}
          <Footer />
        </div>
      </div>


      <ComingSoonDialog open={showDialog} handleClose={() => setShowDialog(false)} />

    </>
  );
};

export default LandingPage;


