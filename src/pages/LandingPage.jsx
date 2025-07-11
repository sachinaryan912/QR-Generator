import React from "react";
import "../styles/Landing.css";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

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


    <div
      className="landing-container"
      style={{ backgroundImage: `url('/assets/qr-bg1.jpeg')` }}
    >


      <div className="landing-overlay">
        <div className="landing-content">
        <h1 className="landing-title">
  Pix<span className="qr-style">QR</span>
</h1>

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
    </>

  );
};

export default LandingPage;
