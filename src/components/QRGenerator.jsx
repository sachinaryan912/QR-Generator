// src/components/QRGenerator.jsx
import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiLink, FiSave, FiFileText, FiDownload, FiUser, FiPhone,
  FiMail, FiBriefcase, FiMapPin, FiWifi, FiMessageSquare, FiLock
} from "react-icons/fi";
import "./QRGenerator.css";
import logoSrc from "../assets/logo.png";
import { Link } from "react-router-dom";

const QRGenerator = ({ qrType }) => {
  const qrRef = useRef(null);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");

  const isLocked = ["vCard", "Location", "SMS", "WiFi"].includes(qrType);

  const QrType = {
    URL: {
      label: "URL",
      placeholder: "https://example.com",
      subtitle: "Enter a valid web address that starts with http:// or https://",
    },
    Text: {
      label: "Text",
      placeholder: "Enter your text here",
      subtitle: "Add any free-form text you want to embed into the QR code.",
    },
    Email: {
      label: "Email",
      placeholder: "Enter your email here",
      subtitle: "A QR code that opens the user's default email client.",
    },
    vCard: {
      label: "vCard",
      subtitle: "Add contact details for a scannable virtual business card.",
      fields: {
        name: "Full Name",
        phone: "Phone Number",
        email: "Email Address",
        org: "Organization",
      },
    },
    Location: { subtitle: "Scan to open location", fields: { lat: "", lng: "" } },
    SMS: { subtitle: "Scan to send SMS", fields: { phone: "", message: "" } },
    WiFi: { subtitle: "Scan to connect to WiFi", fields: { ssid: "", password: "", encryption: "" } }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError("");
  };

  const validate = () => {
    if (isLocked) return false;
    switch (qrType) {
      case "URL": return /^https?:\/\/.+/.test(formData.url);
      case "Text": return formData.text?.trim().length > 0;
      case "Email": return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
      default: return true;
    }
  };

  const getQRValue = () => {
    switch (qrType) {
      case "URL": return formData.url || "";
      case "Text": return formData.text || "";
      case "Email": return `mailto:${formData.email}`;
      case "vCard":
        return `BEGIN:VCARD\nVERSION:3.0\nN:${formData.name}\nTEL:${formData.phone}\nEMAIL:${formData.email}\nORG:${formData.org}\nEND:VCARD`;
      case "Location":
        return `https://maps.google.com/?q=${formData.lat},${formData.lng}`;
      case "SMS":
        return `SMSTO:${formData.phone}:${formData.message}`;
      case "WiFi":
        return `WIFI:S:${formData.ssid};T:${formData.encryption};P:${formData.password};;`;
      default: return "";
    }
  };

  const downloadQR = () => {
    if (!validate()) {
      setError("Please enter valid data.");
      return;
    }
    const canvas = document.getElementById("qr-canvas");
    const context = canvas.getContext("2d");
    const logo = new Image();
    logo.src = logoSrc;
    logo.onload = () => {
      context.drawImage(logo, canvas.width - 50, canvas.height - 50, 40, 40);
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "qr-code.png";
      link.href = url;
      link.click();
    };
  };

  const renderUnlockedFields = () => {
    if (["URL", "Text", "Email"].includes(qrType)) {
      const field = qrType.toLowerCase();
      const icon = {
        url: <FiLink className="input-icon"/>, text: <FiFileText className="input-icon"/>, email: <FiMail className="input-icon"/>
      }[field];

      return (
        <div className="input-wrapper">
          {icon}
          <motion.input
            type="text"
            placeholder={QrType[qrType].placeholder}
            value={formData[field] || ""}
            onChange={e => handleChange(field, e.target.value)}
            whileFocus={{ scale: 1.01 }}
          />
        </div>
      );
    }

    if (qrType === "vCard") {
      return (
        <>
          <div className="row-items">
          <div className="input-row">
            <div className="input-icon-group"><FiUser className="input-icon"/><input type="text" placeholder="Full Name" value={formData.name || ""} onChange={e => handleChange("name", e.target.value)} /></div>
            <div className="input-icon-group"><FiPhone className="input-icon"/><input type="text" placeholder="Phone Number" value={formData.phone || ""} onChange={e => handleChange("phone", e.target.value)} /></div>
          </div>
          <div className="input-row">
            <div className="input-icon-group"><FiMail className="input-icon"/><input type="text" placeholder="Email" value={formData.email || ""} onChange={e => handleChange("email", e.target.value)} /></div>
            <div className="input-icon-group"><FiBriefcase className="input-icon"/><input type="text" placeholder="Organization" value={formData.org || ""} onChange={e => handleChange("org", e.target.value)} /></div>
          </div>
          </div>
        </>
      );
    }

    if (qrType === "Location") {
      return (
        <div className="input-row">
          <div className="input-icon-group"><FiMapPin className="input-icon"/><input type="text" placeholder="Latitude" value={formData.lat || ""} onChange={e => handleChange("lat", e.target.value)} /></div>
          <div className="input-icon-group"><FiMapPin className="input-icon"/><input type="text" placeholder="Longitude" value={formData.lng || ""} onChange={e => handleChange("lng", e.target.value)} /></div>
        </div>
      );
    }

    if (qrType === "SMS") {
      return (
        <div className="input-row">
          <div className="input-icon-group"><FiPhone className="input-icon"/><input type="text" placeholder="Phone" value={formData.phone || ""} onChange={e => handleChange("phone", e.target.value)} /></div>
          <div className="input-icon-group"><FiMessageSquare className="input-icon"/><input type="text" placeholder="Message" value={formData.message || ""} onChange={e => handleChange("message", e.target.value)} /></div>
        </div>
      );
    }

    if (qrType === "WiFi") {
      return (
        <div className="input-row">
          <div className="input-icon-group"><FiWifi className="input-icon"/><input type="text" placeholder="SSID" value={formData.ssid || ""} onChange={e => handleChange("ssid", e.target.value)} /></div>
          <div className="input-icon-group"><FiLock className="input-icon"/><input type="text" placeholder="Password" value={formData.password || ""} onChange={e => handleChange("password", e.target.value)} /></div>
          <div className="input-icon-group"><FiBriefcase className="input-icon"/><input type="text" placeholder="Encryption (WPA/WEP)" value={formData.encryption || ""} onChange={e => handleChange("encryption", e.target.value)} /></div>
        </div>
      );
    }

    return null;
  };

  const qrValue = getQRValue();
  const isValid = validate();

  return (
    <motion.div className="qr-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h3>{qrType} QR Generator</h3>
      <p className="input-subtitle">{QrType[qrType].subtitle}</p>

      <div className="qr-card">
        <div className="qr-cards-wrapper">
          {/* Inputs */}
          <div className="qr-card-section input-section">
            <div className="form-container">
              {renderUnlockedFields()}
              
            </div>

            {isLocked && (
                <div className="lock-overlay">
                <FiLock className="lock-icon" />
               
                <motion.div
                  className="lock-cta"
                  whileHover={{ scale: 1.1 }}
                  animate={{ y: [0, -5, 0], transition: { repeat: Infinity, duration: 1.6 } }}
                >
                   <p>Unlock Now by</p>
                  <Link to="/login" className="lock-signup-link">Free Sign up</Link>
                </motion.div>
              </div>
              
              )}
            {error && <p className="error-text">{error}</p>}

            {isValid && (
              <div className="qr-action-row">
                <motion.a href="/dynamic-qr" className="floating-link" target="_blank" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>Generate dynamic qr code →</motion.a>
                <div className="qr-action-buttons">
                  <motion.button onClick={downloadQR} className="qr-icon-text-button" whileTap={{ scale: 0.95 }}><FiSave />Save</motion.button>
                  <motion.button onClick={downloadQR} className="qr-icon-text-button" whileTap={{ scale: 0.95 }}><FiDownload />Download</motion.button>
                </div>
              </div>
            )}
          </div>

          {/* QR Preview */}
          <AnimatePresence>
            {isValid && (
              <motion.div className="qr-card-section qr-display-section" ref={qrRef} key="qr-display" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }} transition={{ duration: 0.4 }}>
                <QRCodeCanvas id="qr-canvas" value={qrValue} size={220} bgColor="#1a1a1a" fgColor="#f5d442" level="H" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default QRGenerator;
