import React, { useEffect, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import { motion } from "framer-motion";
import "./QrTest.css";

const dotsTypes = ["rounded", "dots", "classy", "classy-rounded", "square", "extra-rounded"];
const cornersTypes = ["dot", "square", "extra-rounded"];

const colors = [
  "#f5d442", "#00e0c6", "#ff6f61", "#6a0dad", "#00b894", "gold-gradient"
];

const goldGradient = {
  type: "radial",
  rotation: 0,
  colorStops: [
    { offset: 0, color: "#f5d442" },
    { offset: 1, color: "#b8860b" },
  ],
};

const qrCode = new QRCodeStyling({
    width: 280,
    height: 280,
    type: "canvas",
    data: "",
    margin: 10,
    dotsOptions: {
      color: "#f5d442",
      type: "rounded",
    },
    cornersSquareOptions: {
      color: "#f5d442",
      type: "extra-rounded",
    },
    backgroundOptions: {
      color: "#ffffff",
    },
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 6,
    },
  });
  

const QrTest = () => {
  const ref = useRef(null);
  const [url, setUrl] = useState("https://pixqr.online");
  const [dotType, setDotType] = useState("square");
  const [cornerType, setCornerType] = useState("square");
  const [selectedColor, setSelectedColor] = useState("#f5d442");
  const [uploadedLogo, setUploadedLogo] = useState(null);
  const [margin, setMargin] = useState(10);

  // Handle social branding
  useEffect(() => {
    let brandColor = selectedColor;
    let brandLogo = uploadedLogo;

    if (url.startsWith("https://www.instagram.com")) {
      brandColor = {
        type: "linear",
        rotation: 0,
        colorStops: [
          { offset: 0, color: "#feda75" },
          { offset: 0.5, color: "#d62976" },
          { offset: 1, color: "#4f5bd5" },
        ],
      };
      brandLogo = "/logos/instagram.png";
    } else if (url.startsWith("https://www.facebook.com")) {
      brandColor = "#1877f2";
      brandLogo = "/logos/facebook.png";
    } else if (url.startsWith("https://www.youtube.com")) {
      brandColor = "#ff0000";
      brandLogo = "/logos/youtube.png";
    } else if (url.startsWith("https://www.x.com") || url.startsWith("https://twitter.com")) {
      brandColor = "#1da1f2";
      brandLogo = "/logos/x_ic.png";
    } else if (selectedColor === "gold-gradient") {
      brandColor = goldGradient;
    }

    qrCode.update({
      data: url,
      image: brandLogo,
      dotsOptions: {
        color: brandColor,
        type: dotType,
      },
      cornersSquareOptions: {
        color: brandColor,
        type: cornerType,
      },
    });
  }, [url, dotType, cornerType, selectedColor, uploadedLogo]);

  useEffect(() => {
    if (ref.current) {
      qrCode.append(ref.current);
      
      
    }
  }, []);

  useEffect(() => {
    qrCode.update({
      margin: margin
    });
  }, [margin]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedLogo(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const downloadQRCode = () => {
    qrCode.download({ name: "custom-qr-code", extension: "png" });
  };

  return (
    <motion.div className="fancy-qr-container" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="qr-wrapper">
        <div className="controller">
            <h1>PixQR Test QR Generator</h1>
            <p>Customize your QR code with colors, shapes, and logos!</p>
            <input
          type="text"
          className="qr-input"
          placeholder="Enter URL or text..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

<div className="color-options">
          {colors.map((color) => (
            <button
              key={color}
              className={`color-btn ${selectedColor === color ? "active" : ""}`}
              style={{
                background: color === "gold-gradient"
                  ? "linear-gradient(45deg, #f5d442, #b8860b)"
                  : color,
              }}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </div>

        <div className="type-selects">
          <select value={dotType} onChange={(e) => setDotType(e.target.value)}>
            {dotsTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
          <select value={cornerType} onChange={(e) => setCornerType(e.target.value)}>
            {cornersTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="upload-input"
        />

        <div className="margin-slider">
        <label htmlFor="qr-margin">QR Padding: {margin}px</label>
        <input
            id="qr-margin"
            type="range"
            min="0"
            max="40"
            value={margin}
            onChange={(e) => setMargin(parseInt(e.target.value))}
        />
        </div>
        </div>
        

        


        <div className="output-layout">
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
      </div>
    </motion.div>
  );
};

export default QrTest;
