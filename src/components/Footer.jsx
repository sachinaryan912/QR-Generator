import React from "react";
import "../styles/Footer.css";
import { FaLinkedin, FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

const Footer = () => (
  <footer className="pixqr-footer">
    <div className="footer-container">
      <div className="footer-logo">
        <h2>PixQR</h2>
        <p>Smart QR Code Generator</p>
      </div>

      <div className="footer-links">
        <div className="footer-col">
          <h4>Product</h4>
          <a href="/features">Features</a>
          <a href="/themes">Themes</a>
          <a href="/faq">FAQs</a>
        </div>
        <div className="footer-col">
          <h4>Company</h4>
          <a href="/about">About Us</a>
          <a href="/contact">Contact</a>
          <a href="/blogs">Blogs</a>
        </div>
        <div className="footer-col">
          <h4>Support</h4>
          <a href="/help">Help Center</a>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms">Terms & Conditions</a>
        </div>
      </div>
    </div>

    <div className="footer-divider" />

    <div className="footer-bottom">
      <div className="footer-social">
        <a href="https://www.linkedin.com/company/pixqr" target="_blank" rel="noreferrer"><FaLinkedin /></a>
        <a href="https://www.instagram.com/pixqr.online" target="_blank" rel="noreferrer"><FaInstagram /></a>
        <a href="https://www.facebook.com/pixqr" target="_blank" rel="noreferrer"><FaFacebook /></a>
        <a href="https://twitter.com/pix_qr" target="_blank" rel="noreferrer"><FaTwitter /></a>
      </div>
      <p>© 2025 PixQR. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
