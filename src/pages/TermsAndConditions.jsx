// src/components/TermsAndConditions.jsx
import React from 'react';
import { Helmet } from 'react-helmet';
import '../styles/legalPages.css';
import logo from '../assets/logo.png'; // Replace with your actual logo path

const TermsAndConditions = () => {
  return (
    <div className="legal-container">
      <Helmet>
        <title>Terms & Conditions | PixQR - Free Online QR Code Generator with Logo</title>
        <meta
          name="description"
          content="Read the terms and conditions for using PixQR – the best free QR code generator online. Generate custom QR codes, bulk QR codes, UPI QR codes, and more."
        />
        <meta
          name="keywords"
          content="QR Code Generator, Free QR Code Generator, QR Code Generator with Logo, Bulk QR Code Generator, UPI QR Code Generator, QR Code Scanner, Google QR Code Generator, Custom QR Code Generator, QR Code Monkey, Canva QR Code, pixqr, terms and conditions, legal, user agreement"
        />
      </Helmet>

      <img src={logo} alt="PixQR Logo" className="legal-logo" />
      <h1>Terms & Conditions</h1>
      <p className="last-updated">Effective Date: July 13, 2025</p>

      <section>
        <h2>1. Use of Service</h2>
        <p>PixQR provides fast, secure, and user-friendly QR Code generation services including features like QR Code with logo, UPI QR codes, and bulk QR code generation. By accessing our service, you agree not to misuse it, replicate its interface, or engage in unlawful activities.</p>
      </section>

      <section>
        <h2>2. User Accounts</h2>
        <p>While PixQR allows free QR code generation with no sign-up required, registered users can access premium features like custom branding, analytics, and QR history. Always provide accurate data during login and keep your credentials safe.</p>
      </section>

      <section>
        <h2>3. Intellectual Property</h2>
        <p>All designs, tools, code, logos, and QR technologies used by PixQR are the intellectual property of PixQR. Unauthorized use, reverse engineering, or resale of these tools (including the QR code generator with logo feature) is strictly prohibited.</p>
      </section>

      <section>
        <h2>4. Premium Features</h2>
        <p>PixQR offers additional functionalities like custom QR code design, business card QR code generation, and Google-style QR generators under our premium plans. These features may change and are subject to separate licensing terms.</p>
      </section>

      <section>
        <h2>5. Limitation of Liability</h2>
        <p>PixQR is not liable for misuse of generated QR codes or errors due to incorrect input. Use the service responsibly and verify data before generating QR codes, especially for UPI, website links, or business cards.</p>
      </section>

      <section>
        <h2>6. Termination</h2>
        <p>We reserve the right to suspend or terminate any user’s access who violates these terms or misuses the QR code generator, bulk tools, or scanner functionality.</p>
      </section>

      <section>
        <h2>7. Changes</h2>
        <p>We may update our terms for compliance or better service. Continued use of PixQR confirms acceptance of updated terms.</p>
      </section>

      <p className="contact-info">Contact: support@pixqr.online</p>
    </div>
  );
};

export default TermsAndConditions;
