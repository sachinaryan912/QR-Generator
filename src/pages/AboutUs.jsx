// src/components/AboutUs.jsx
import React from 'react';
import { Helmet } from 'react-helmet';
import '../styles/legalPages.css';
import logo from '../assets/logo.png'; // Replace with your actual logo path

const AboutUs = () => {
  return (
    <div className="legal-container">
      <Helmet>
        <title>About Us | PixQR - Free QR Code Generator with Logo & UPI</title>
        <meta
          name="description"
          content="Learn about PixQR – a secure, stylish, and smart QR code generator. We offer free and premium QR solutions including logo branding, UPI QR, vCard, SMS, and more."
        />
        <meta
          name="keywords"
          content="QR code generator, about PixQR, free QR code generator, QR generator with logo, custom QR codes, UPI QR generator, QR scanner, business QR, secure QR code platform, best QR code generator"
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://pixqr.online/about" />

        {/* Open Graph */}
        <meta property="og:title" content="About PixQR | Smart QR Code Generator" />
        <meta property="og:description" content="PixQR is your all-in-one platform for generating free and premium QR codes with logo, UPI, and secure tracking. Built with ❤️ in India." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pixqr.online/about" />
        <meta property="og:image" content="https://pixqr.online/assets/preview-banner.png" />
        <meta property="og:site_name" content="PixQR" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About PixQR - Stylish & Secure QR Code Generator" />
        <meta name="twitter:description" content="Explore PixQR’s mission to simplify and secure QR code generation for everyone. Custom QR codes with logos, UPI, vCard, and more." />
        <meta name="twitter:image" content="https://pixqr.online/assets/preview-banner.png" />
        <meta name="twitter:site" content="@pixqr" />

        {/* Social Profiles */}
        <link rel="me" href="https://www.linkedin.com/company/pixqr" />
        <link rel="me" href="https://www.instagram.com/pixqr.online" />
      </Helmet>

      <img src={logo} alt="PixQR Logo" className="legal-logo" />
      <h1>About PixQR</h1>
      <p className="tagline">Smart, Stylish & Secure QR Code Generator</p>

      <section>
        <h2>🚀 Our Vision</h2>
        <p>
          PixQR was built to redefine how people generate QR codes — by blending secure technology with beautiful, branded designs.
          We aim to empower individuals, businesses, creators, and developers to create QR codes that aren’t just functional, but iconic.
        </p>
      </section>

      <section>
        <h2>🎯 What We Offer</h2>
        <ul>
          <li>✔️ Free QR Code Generator for URL, Text, Wi-Fi, vCard, SMS, and UPI</li>
          <li>✔️ Premium features: Custom logos, colors, gradients, and branding</li>
          <li>✔️ Trackable, high-quality QR codes with built-in analytics (coming soon)</li>
          <li>✔️ Beautiful UI/UX with smooth animations for easy QR creation</li>
        </ul>
      </section>

      <section>
        <h2>💡 Why Choose PixQR?</h2>
        <ul>
          <li>🎨 Pixel-perfect, branded QR designs tailored for your identity</li>
          <li>🔒 End-to-end encrypted and secure QR generation system</li>
          <li>📈 Built for creators, businesses, and developers alike</li>
          <li>🇮🇳 Proudly built with ❤️ in India</li>
        </ul>
      </section>

      <section>
        <h2>📬 Contact Us</h2>
        <p><strong>Support:</strong> <a href="mailto:support@pixqr.online">support@pixqr.online</a></p>
        <p><strong>Business:</strong> <a href="mailto:hello@pixqr.online">hello@pixqr.online</a></p>
      </section>
    </div>
  );
};

export default AboutUs;
