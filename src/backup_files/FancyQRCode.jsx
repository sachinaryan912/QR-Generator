// src/components/FancyQRCode.jsx
import React, { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import { motion } from "framer-motion";
import "./FancyQRCode.css";

const qrCode = new QRCodeStyling({
  width: 280,
  height: 280,
  type: "canvas",
  data: "https://aryantechworld.com",
  image: "/logo.png", // Your logo path
  dotsOptions: {
    color: "#f5d442",
    type: "rounded",
  },
  cornersSquareOptions: {
    color: "#f5d442",
    type: "extra-rounded",
  },
  backgroundOptions: {
    color: "#121212",
  },
  imageOptions: {
    crossOrigin: "anonymous",
    margin: 6,
  },
});

const FancyQRCode = ({ url }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (url) {
      qrCode.update({ data: url });
    }
    if (ref.current) {
      qrCode.append(ref.current);
    }
  }, [url]);

  const downloadQRCode = () => {
    qrCode.download({
      name: "custom-qr-code",
      extension: "png",
    });
  };

  return (
    <motion.div
      className="fancy-qr-container"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="qr-wrapper">
        <div className="qr-output" ref={ref}></div>
        <motion.button
          className="download-btn"
          onClick={downloadQRCode}
          whileTap={{ scale: 0.95 }}
          whileHover={{ backgroundColor: "#00e0c6" }}
        >
          Save QR Image
        </motion.button>
      </div>
    </motion.div>
  );
};

export default FancyQRCode;
