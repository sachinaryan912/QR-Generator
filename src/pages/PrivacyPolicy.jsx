// src/components/PrivacyPolicy.jsx
import React from 'react';
import { Helmet } from 'react-helmet';
import '../styles/legalPages.css';
import logo from '../assets/logo.png'; // Replace with your actual logo path

const PrivacyPolicy = () => {
  return (
    <div className="legal-container">
      <Helmet>
        <title>Privacy Policy | PixQR - Secure & Free QR Code Generator Online</title>
        <meta
          name="description"
          content="Learn how PixQR protects your personal data. We are committed to user privacy while offering free QR code generation, scanning, and logo branding tools."
        />
        <meta
          name="keywords"
          content="QR Code Generator, Free QR Code Generator, QR Code Generator with Logo, Custom QR Code Generator, Secure QR Code Generator, QR Code Scanner, UPI QR Code Generator, QR Code Monkey, Canva QR Code, pixqr, privacy policy, data protection, user privacy"
        />
      </Helmet>

      <img src={logo} alt="PixQR Logo" className="legal-logo" />
      <h1>Privacy Policy</h1>
      <p className="last-updated">Effective Date: July 13, 2025</p>

      <section>
        <h2>1. Information We Collect</h2>
        <p>We collect data such as email address, username, QR code type (e.g., URL, text, UPI, business card), and usage behavior. This allows us to improve services like our custom QR code generator with logo, bulk tools, and QR code scanner features.</p>
      </section>

      <section>
        <h2>2. How We Use Your Data</h2>
        <p>Your information helps us deliver relevant features including login history, recent QR generation activity, and branding settings. PixQR ensures that your data is never used for unsolicited marketing.</p>
      </section>

      <section>
        <h2>3. Data Sharing</h2>
        <p>We never sell your data. Some third-party services may be involved in analytics, hosting, or payment, all operating under secure contracts. Your QR code generation and scanning data is encrypted and not shared publicly.</p>
      </section>

      <section>
        <h2>4. Data Security</h2>
        <p>We employ best-in-class encryption and firewalls to protect your QR data and login credentials. All interactions, including free QR generation or business card QR download, are processed over HTTPS.</p>
      </section>

      <section>
        <h2>5. Your Rights</h2>
        <p>You may contact us to review, modify, or delete your account and associated data. This applies whether you're using PixQR for free or as a premium member.</p>
      </section>

      <section>
        <h2>6. Children's Privacy</h2>
        <p>PixQR does not knowingly collect information from users under 13. If you’re a parent or guardian and believe your child has provided data, contact us immediately.</p>
      </section>

      <section>
        <h2>7. Updates</h2>
        <p>We may revise this policy as our QR services grow. Major changes will be notified via email or banner alerts. For example, if we enhance bulk QR code features or introduce new UPI tools, updates will be reflected here.</p>
      </section>

      <p className="contact-info">Contact: privacy@pixqr.online</p>
    </div>
  );
};

export default PrivacyPolicy;
