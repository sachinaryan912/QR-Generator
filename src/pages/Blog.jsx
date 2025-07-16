// src/components/Blog.jsx
import React from 'react';
import { Helmet } from 'react-helmet';
import '../styles/Blog.css';
import blogData from '../data/BlogData';
import { Link } from 'react-router-dom';

const Blog = () => {
  return (
    <div className="blog-container">
      <Helmet>
        <title>PixQR Blog | QR Code Generator Tips, Uses, and Tutorials</title>
        <meta
          name="description"
          content="Explore the PixQR blog to learn how to generate custom QR codes, use logos, UPI QR, Wi-Fi sharing, vCards, and more. Discover secure, stylish QR code solutions."
        />
        <meta
          name="keywords"
          content="QR code blog, QR code generator, custom QR codes, QR generator with logo, UPI QR code, QR code use cases, PixQR tutorials, QR business cards"
        />
        <link rel="canonical" href="https://pixqr.online/blog" />
         {/* Twitter Card */}
         <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About PixQR - Stylish & Secure QR Code Generator" />
        <meta name="twitter:description" content="Explore PixQR’s mission to simplify and secure QR code generation for everyone. Custom QR codes with logos, UPI, vCard, and more." />
        <meta name="twitter:image" content="https://pixqr.online/assets/preview-banner.png" />
        <meta name="twitter:site" content="@pix_qr" />

        {/* Social Profiles */}
        <link rel="me" href="https://www.linkedin.com/company/pixqr" />
        <link rel="me" href="https://www.instagram.com/pixqr.online" />
      </Helmet>

      {/* <Simple_Navbar /> */}

      <h1 className="blog-title">PixQR Blog</h1>
      <p className="blog-subtitle">Tips, tricks & guides on secure and stylish QR generation</p>

      <div className="blog-grid">
        {blogData.map((blog, index) => (
          <div className="blog-card" key={index}>
            <img src={blog.image} alt={blog.title} className="blog-image" />
            <h2 className="blog-card-title">{blog.title}</h2>
            <p className="blog-snippet">{blog.snippet}</p>
            <Link to={`/blog/${blog.slug}`} className="read-more">
  Read More →
</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
