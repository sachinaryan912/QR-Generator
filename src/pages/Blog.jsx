// src/components/Blog.jsx
import React from 'react';
import { Helmet } from 'react-helmet';
import '../styles/Blog.css';
import blogData from '../data/BlogData';
import { Link } from 'react-router-dom';
import Simple_Navbar from '../components/Simple_Navbar';

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
