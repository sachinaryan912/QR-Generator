// src/components/QRGenerator.jsx
import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { motion } from "framer-motion";
import "./QRGenerator.css";
import { FiSave, FiDownload } from "react-icons/fi";
import logoSrc from '../assets/logo.png';

const QRGenerator = ({ qrType }) => {
  const qrRef = useRef(null);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");

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
  };
  

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const validate = () => {
    switch (qrType) {
      case "URL":
        return /^(https?:\/\/)[\w.-]+\.[a-z]{2,}/i.test(formData.url);
      case "Text":
        return formData.text?.trim().length > 0;
      case "Email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
      case "vCard":
        return formData.name && formData.phone;
      default:
        return false;
    }
  };

  const getQRValue = () => {
    switch (qrType) {
      case "URL":
        return formData.url || "";
      case "Text":
        return formData.text || "";
      case "Email":
        return `mailto:${formData.email}`;
      case "vCard":
        return `BEGIN:VCARD\nVERSION:3.0\nN:${formData.name}\nTEL:${formData.phone}\nEMAIL:${formData.email || ""}\nORG:${formData.org || ""}\nEND:VCARD`;
      default:
        return "";
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
      const logoSize = 40;
      const padding = 10;
      const x = canvas.width - logoSize - padding;
      const y = canvas.height - logoSize - padding;
  
      context.drawImage(logo, x, y, logoSize, logoSize);
  
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "qr-code.png";
      link.href = url;
      link.click();
    };
  };
  

  const renderForm = () => {
    switch (qrType) {
      case "URL":
      case "Text":
      case "Email":
        const field = qrType.toLowerCase();
        return (
          <div>
            <label htmlFor="qr-input" className="input-label">
              Enter your {QrType[qrType].label.toLowerCase()}
            </label>
            <p className="input-subtitle">{QrType[qrType].subtitle}</p>
            <motion.input
              id="qr-input"
              className="qr-input"
              type="text"
              placeholder={QrType[qrType].placeholder}
              value={formData[field] || ""}
              onChange={(e) => handleChange(field, e.target.value)}
              whileFocus={{ scale: 1.02 }}
            />
          </div>
        );
  
      case "vCard":
        return (
          <>
            <p className="input-subtitle">{QrType[qrType].subtitle}</p>
            {Object.entries(QrType.vCard.fields).map(([key, label]) => (
              <div key={key} style={{ marginBottom: "1rem" }}>
                <label className="input-label">{label}</label>
                <motion.input
                  className="qr-input"
                  type="text"
                  placeholder={`Enter ${label}`}
                  value={formData[key] || ""}
                  onChange={(e) => handleChange(key, e.target.value)}
                  whileFocus={{ scale: 1.02 }}
                />
              </div>
            ))}
          </>
        );
  
      default:
        return null;
    }
  };
  

  const qrValue = getQRValue();
  const isValid = validate();

  return (
    <motion.div className="qr-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="qr-card">
        <div className="qr-cards-wrapper">
          {/* Input Section */}
          <div className="qr-card-section input-section">
            {renderForm()}
            {error && <p style={{ color: "red", marginTop: "0.5rem" }}>{error}</p>}

            {isValid && (
          <div className="qr-action-row">
       
            <motion.a
              href="/dynamic-qr"
              className="floating-link"
              target="_blank"
              rel="noopener noreferrer"
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              Generate dynamic qr code now →
            </motion.a>
       
  
            <div className="qr-action-buttons">
              <motion.button
                className="qr-icon-text-button"
                onClick={downloadQR}
                whileTap={{ scale: 0.95 }}
                aria-label="Save QR Code"
              >
                <FiSave className="qr-btn-icon" />
                Save QR Code
              </motion.button>

              <motion.button
                className="qr-icon-text-button"
                onClick={downloadQR}
                whileTap={{ scale: 0.95 }}
                aria-label="Download Now"
              >
                <FiDownload className="qr-btn-icon" />
                Download Now
              </motion.button>
            </div>
          </div>
        )}
          </div>
  
          {/* QR Preview */}
          <motion.div
            className="qr-card-section qr-display-section"
            ref={qrRef}
            whileHover={{ scale: 1.02 }}
          >
            {isValid ? (
              <>
               <QRCodeCanvas
                  id="qr-canvas"
                  value={qrValue}
                  size={220}
                  bgColor="#1a1a1a"
                  fgColor="#f5d442"
                  includeMargin
                  level="H"
                />


              </>
            ) : (
              <p className="qr-placeholder">QR will appear here</p>
            )}
          </motion.div>
        </div>
  
        
      </div>
    </motion.div>
  );
  
};

export default QRGenerator;
