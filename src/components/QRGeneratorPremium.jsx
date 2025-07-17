// src/components/QRGenerator.jsx
import React, { useEffect, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiLink,
  FiSave,
  FiFileText,
  FiDownload,
  FiUser,
  FiPhone,
  FiMail,
  FiBriefcase,
  FiMapPin,
  FiWifi,
  FiMessageSquare,
  FiLock,
} from "react-icons/fi";
import "./QRGenerator.css";
import { Link } from "react-router-dom";
import "../pages/QrTest.css";

const dotsTypes = [
  "square",
  "dots",
  "rounded",
  "classy",
  "classy-rounded",
  "extra-rounded",
];
const cornersTypes = ["square", "dot", "extra-rounded"];

const QRGeneratorPremium = ({ qrType }) => {
  const qrRef = useRef(null);
  const [formData, setFormData] = useState({});
  const [dotColor, setDotColor] = useState("#000");
  const [dotType, setDotType] = useState("square");
  const [cornerType, setCornerType] = useState("square");
  const [logoImage, setLogoImage] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [error, setError] = useState("");

  const isLocked = ["vCard", "Location", "SMS", "WiFi"].includes(qrType);

  const QrType = {
    URL: {
      label: "URL",
      placeholder: "https://example.com",
      subtitle:
        "Enter a valid web address that starts with http:// or https://",
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
    Location: {
      subtitle: "Scan to open location",
      fields: { lat: "", lng: "" },
    },
    SMS: { subtitle: "Scan to send SMS", fields: { phone: "", message: "" } },
    WiFi: {
      subtitle: "Scan to connect to WiFi",
      fields: { ssid: "", password: "", encryption: "" },
    },
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const validate = () => {
    if (isLocked) return false;
    switch (qrType) {
      case "URL":
        return /^https?:\/\/.+/.test(formData.url);
      case "Text":
        return formData.text?.trim().length > 0;
      case "Email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
      default:
        return true;
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
        return `BEGIN:VCARD\nVERSION:3.0\nN:${formData.name}\nTEL:${formData.phone}\nEMAIL:${formData.email}\nORG:${formData.org}\nEND:VCARD`;
      case "Location":
        return `https://maps.google.com/?q=${formData.lat},${formData.lng}`;
      case "SMS":
        return `SMSTO:${formData.phone}:${formData.message}`;
      case "WiFi":
        return `WIFI:S:${formData.ssid};T:${formData.encryption};P:${formData.password};;`;
      default:
        return "";
    }
  };

  // Create and update QR Code instance
  useEffect(() => {
    const qr = new QRCodeStyling({
      width: 220,
      height: 220,
      type: "canvas",
      data: getQRValue(),
      image: logoImage,
      dotsOptions: {
        color: dotColor,
        type: dotType,
      },
      cornersSquareOptions: {
        color: dotColor,
        type: cornerType,
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 6,
      },
      backgroundOptions: {
        color: "#ffffff",
      },
    });

    setQrCode(qr);

    return () => qrRef.current?.replaceChildren(); // cleanup on type switch
  }, []); // once on mount

  useEffect(() => {
    if (!qrCode) return;

    qrCode.update({
      data: getQRValue(),
      image: logoImage,
      dotsOptions: { color: dotColor, type: dotType },
      cornersSquareOptions: { color: dotColor, type: cornerType },
    });

    qrRef.current.innerHTML = "";
    qrCode.append(qrRef.current);
  }, [formData, dotColor, dotType, cornerType, logoImage]);

  const downloadQR = async () => {
    if (!validate()) {
      setError("Please enter valid data.");
      return;
    }
    await qrCode.download({ extension: "png" });
  };

  const onLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setLogoImage(reader.result);
    reader.readAsDataURL(file);
  };

  const renderUnlockedFields = () => {
    const icon =
      {
        url: <FiLink />,
        text: <FiFileText />,
        email: <FiMail />,
      }[qrType.toLowerCase()] || null;

    if (["URL", "Text", "Email"].includes(qrType)) {
      const field = qrType.toLowerCase();
      const icon = {
        url: <FiLink className="input-icon" />,
        text: <FiFileText className="input-icon" />,
        email: <FiMail className="input-icon" />,
      }[field];

      return (
        <div className="input-wrapper">
          {icon}
          <motion.input
            type="text"
            placeholder={QrType[qrType].placeholder}
            value={formData[field] || ""}
            onChange={(e) => handleChange(field, e.target.value)}
            whileFocus={{ scale: 1.01 }}
          />
        </div>
      );
    }

    if (qrType === "SMS") {
      return (
        <div className="input-row">
          <div className="input-icon-group">
            <FiPhone className="input-icon" />
            <input
              type="text"
              placeholder="Phone"
              value={formData.phone || ""}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </div>
          <div className="input-icon-group">
            <FiMessageSquare className="input-icon" />
            <input
              type="text"
              placeholder="Message"
              value={formData.message || ""}
              onChange={(e) => handleChange("message", e.target.value)}
            />
          </div>
        </div>
      );
    }

    if (qrType === "WiFi") {
      return (
        <div className="input-row">
          <div className="input-icon-group">
            <FiWifi className="input-icon" />
            <input
              type="text"
              placeholder="SSID"
              value={formData.ssid || ""}
              onChange={(e) => handleChange("ssid", e.target.value)}
            />
          </div>
          <div className="input-icon-group">
            <FiLock className="input-icon" />
            <input
              type="text"
              placeholder="Password"
              value={formData.password || ""}
              onChange={(e) => handleChange("password", e.target.value)}
            />
          </div>
          <div className="input-icon-group">
            <FiBriefcase className="input-icon" />
            <input
              type="text"
              placeholder="Encryption (WPA/WEP)"
              value={formData.encryption || ""}
              onChange={(e) => handleChange("encryption", e.target.value)}
            />
          </div>
        </div>
      );
    }

    if (qrType === "Location") {
      return (
        <div className="input-row">
          <div className="input-icon-group">
            <FiMapPin className="input-icon" />
            <input
              type="text"
              placeholder="Latitude"
              value={formData.lat || ""}
              onChange={(e) => handleChange("lat", e.target.value)}
            />
          </div>
          <div className="input-icon-group">
            <FiMapPin className="input-icon" />
            <input
              type="text"
              placeholder="Longitude"
              value={formData.lng || ""}
              onChange={(e) => handleChange("lng", e.target.value)}
            />
          </div>
        </div>
      );
    }

    if (qrType === "vCard") {
      return (
        <>
          <div className="row-items">
            <div className="input-row">
              <div className="input-icon-group">
                <FiUser className="input-icon" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name || ""}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              </div>
              <div className="input-icon-group">
                <FiPhone className="input-icon" />
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={formData.phone || ""}
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
              </div>
            </div>
            <div className="input-row">
              <div className="input-icon-group">
                <FiMail className="input-icon" />
                <input
                  type="text"
                  placeholder="Email"
                  value={formData.email || ""}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </div>
              <div className="input-icon-group">
                <FiBriefcase className="input-icon" />
                <input
                  type="text"
                  placeholder="Organization"
                  value={formData.org || ""}
                  onChange={(e) => handleChange("org", e.target.value)}
                />
              </div>
            </div>
          </div>
        </>
      );
    }

    return null;
  };

  return (
    <motion.div
      className="qr-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h3>{qrType} QR Generator</h3>
      <p className="input-subtitle">{QrType[qrType].subtitle}</p>

      <div className="qr-card">
        <div className="qr-card-section input-section">
          {renderUnlockedFields()}

          <h4>Dot Pattern</h4>
          <div className="pattern-options">
            {dotsTypes.map((type) => (
              <button
                key={type}
                onClick={() => setDotType(type)}
                className={dotType === type ? "active" : ""}
              >
                {type}
              </button>
            ))}
          </div>

          <h4>Corner Style</h4>
          <div className="pattern-options">
            {cornersTypes.map((type) => (
              <button
                key={type}
                onClick={() => setCornerType(type)}
                className={cornerType === type ? "active" : ""}
              >
                {type}
              </button>
            ))}
          </div>

          <h4>Color</h4>
          <div className="color-options">
            {["#000", "#f00", "#0f0", "#00f", "#ffa500", "#800080", "#0ff"].map(
              (c) => (
                <button
                  key={c}
                  className="color-circle"
                  style={{ background: c }}
                  onClick={() => setDotColor(c)}
                />
              )
            )}
          </div>

          <h4>Logo</h4>
          <input type="file" onChange={onLogoChange} />

          {error && <p className="error-text">{error}</p>}

          <motion.button
            onClick={downloadQR}
            whileTap={{ scale: 0.95 }}
            className="download-button"
          >
            <FiDownload /> Download
          </motion.button>
        </div>

        <motion.div
          className="qr-card-section qr-display-section"
          ref={qrRef}
        />
      </div>
    </motion.div>
  );
};

export default QRGeneratorPremium;
