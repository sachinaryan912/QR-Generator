import React from "react";
import "../styles/Landing.css";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="landing-container"
      style={{ backgroundImage: `url('/assets/qr-bg2.jpeg')` }}
    >
      <Helmet>
        <title>PixQR | Smart QR Code Generator</title>
        <meta
          name="description"
          content="Generate beautiful and branded QR codes with PixQR. Simple. Elegant. Free & Premium."
        />
      </Helmet>

      <div className="landing-overlay">
        <div className="landing-content">
          <h1 className="landing-title">PixQR</h1>
          <p className="landing-subtitle">
            Create, Customize & Download Stunning QR Codes
          </p>
          <div className="landing-buttons">
            <button className="btn-outline" onClick={() => navigate("/login")}>
              Get Started
            </button>
          </div>
        </div>

        <div className="info-section">
          <h2>Why PixQR?</h2>
          <p>
            PixQR helps you generate sleek, branded, and ready-to-use QR codes
            in seconds. Whether you’re a creator or business — we've got the perfect QR
            styling for you.
          </p>

          <h3>🆓 Free Features:</h3>
          <ul>
            <li>URL and text QR codes</li>
            <li>Basic color customization</li>
            <li>Download as PNG</li>
          </ul>

          <h3>💰 Token based Premium Upgrade:</h3>
          <ul>
          <li>All free features</li>
          <li>Phone and email QR codes</li>
            <li>Add your brand logo inside the QR code</li>
            <li>Beautiful QR design</li>
            <li>Gradient and advanced color styles</li>
            <li>Custom background images (transparent or themed)</li>
          </ul>
        </div>

        <footer className="landing-footer">
          © 2025 PixQR · Smart QR Code Generator
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
