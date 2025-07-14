// src/components/BlogPage.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import blogData from '../../data/BlogData';
import '../../styles/Blog.css';

const BlogPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const blog = blogData.find((item) => item.slug === slug);

  if (!blog) {
    return <div className="blog-container"><h2>Blog not found</h2></div>;
  }

  return (
    <div className="blog-container blog-detail">
      <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
      <h1 className="blog-title">{blog.title}</h1>
      <img src={blog.image} alt={blog.title} className="blog-image" />
      <div
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>
  );
};

export default BlogPage;
