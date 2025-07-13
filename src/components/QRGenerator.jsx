// src/components/QRGenerator.jsx
import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { motion } from "framer-motion";
import "./QRGenerator.css";

const QRGenerator = ({qrType}) => {
  const [url, setUrl] = useState("");
  const qrRef = useRef(null);

  const QrType={
    URL:{
      label: "URL",
      placeholder: "https://example.com",
    },
    Text: {
      label: "Text",
      placeholder: "Enter your text here",
    },
    Email: {
      label: "Email",
      placeholder: "Enter your email here"
    },
    vCard: {
      label: "vCard",
      placeholder: "Enter your vCard details here"
    }
  }

  const downloadQR = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "qr-code.png";
    link.href = url;
    link.click();
  };

  return (
    <motion.div className="qr-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
    <motion.h1 className="qr-title" initial={{ y: -50 }} animate={{ y: 0 }}>
      QR Code Generator
    </motion.h1>
  
    <div className="qr-card">
      <div className="qr-cards-wrapper">
        {/* Input Card */}
        <div className="qr-card-section input-section">
          <label htmlFor="qr-input" className="input-label">Enter your {QrType[qrType].label.toLowerCase()}</label>
          <motion.input
            id="qr-input"
            className="qr-input"
            type={QrType[qrType].label.toLowerCase()}
            placeholder={QrType[qrType].placeholder}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            whileFocus={{ scale: 1.02 }}
          />
        </div>
  
        {/* QR Preview Card */}
        <motion.div
          className="qr-card-section qr-display-section"
          ref={qrRef}
          whileHover={{ scale: 1.02 }}
        >
          {url ? (
            <>
              <QRCodeCanvas
                value={url}
                size={180}
                bgColor="#1a1a1a"
                fgColor="#f5d442"
                includeMargin
                level="H"
                
              />
              <img src="/logo.png" alt="Logo" className="qr-logo" />
            </>
          ) : (
            <p className="qr-placeholder">QR will appear here</p>
          )}
        </motion.div>
      </div>
  
      {/* Save Button */}
      {url && (
        <motion.button
          className="qr-download"
          onClick={downloadQR}
          whileTap={{ scale: 0.95 }}
        >
          Save QR Code
        </motion.button>
      )}
    </div>
  </motion.div>
  );
};

export default QRGenerator;
