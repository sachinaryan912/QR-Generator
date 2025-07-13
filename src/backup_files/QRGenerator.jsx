// src/components/QRGenerator.jsx
import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { motion } from "framer-motion";
import "./QRGenerator.css";

const QRGenerator = () => {
  const [url, setUrl] = useState("");
  const qrRef = useRef(null);

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

      <motion.input
        className="qr-input"
        type="text"
        placeholder="Enter your link..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        whileFocus={{ scale: 1.02 }}
      />

<motion.div
  className="qr-box"
  ref={qrRef}
  whileHover={{ scale: 1.05 }}
  style={{ position: "relative", display: "inline-block" }}
>
  {url && (
    <>
      <QRCodeCanvas
        value={url}
        size={180}
        bgColor="#1a1a1a"
        fgColor="#00f5d4"
        includeMargin
        level="H" // High error correction level for logo support
      />
      <img
        src="/logo.png" // Replace with your actual logo path
        alt="Logo"
        className="qr-logo"
      />
    </>
  )}
</motion.div>


      {url && (
        <motion.button className="qr-download" onClick={downloadQR} whileTap={{ scale: 0.95 }}>
          Save QR Code
        </motion.button>
      )}
    </motion.div>
  );
};

export default QRGenerator;
