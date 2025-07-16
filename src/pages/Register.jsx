// src/pages/Register.jsx
import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, database } from "../firebase";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/Login.css"; // reuse login.css
import { Helmet } from "react-helmet"; // for SEO
import SimpleNavbar from "../components/Simple_Navbar";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) navigate("/home");
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCred.user.uid;

      await set(ref(database, `users/${userId}`), {
        username,
        email,
        token: 5,
        createdAt: new Date().toISOString(),
        level: 0
      });

      navigate("/home");
    } catch (error) {
      setErr("Registration failed");
    }
  };

  return (
    <>

<Helmet>
  <title>Register | PixQR - Create Your Free Account</title>
  <meta
    name="description"
    content="Join PixQR and start generating stylish QR codes. Register for free to access secure and premium QR features including vCard, SMS, Wi-Fi, UPI, logos, and more."
  />
  <meta
    name="keywords"
    content="PixQR register, create QR account, sign up PixQR, register QR code generator, generate QR codes, QR signup, QR code with logo, free QR code generator, QR code scanner, UPI QR code, business card QR, QR code generator login, bulk QR code generator"
  />
  <meta name="robots" content="index, follow" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="canonical" href="https://pixqr.online/register" />

  {/* Open Graph (for LinkedIn, Facebook, WhatsApp, etc.) */}
  <meta property="og:title" content="Register | PixQR - Create Your Free Account" />
  <meta property="og:description" content="Create your free PixQR account and start generating secure, customizable QR codes with logos, UPI, vCard, and more. No design skills needed." />
  <meta property="og:url" content="https://pixqr.online/register" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://pixqr.online/assets/preview-banner.png" />
  <meta property="og:site_name" content="PixQR" />
  <meta property="og:locale" content="en_US" />

  {/* LinkedIn */}
  <meta name="linkedin:owner" content="https://www.linkedin.com/company/pixqr/" />

  {/* Instagram (for profile context in some apps) */}
  <meta property="instapp:owner_user" content="https://www.instagram.com/pixqr.official/" />

  {/* Twitter Card */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Register | PixQR - Create Free Account" />
  <meta name="twitter:description" content="Sign up and unlock PixQR's free and premium QR code generator. Add logos, business info, Wi-Fi, SMS, and more." />
  <meta name="twitter:image" content="https://pixqr.online/assets/preview-banner.png" />
  <meta name="twitter:site" content="@pix_qr" />
</Helmet>

<SimpleNavbar />
    <div className="login-bg" style={{ backgroundImage: `url('/assets/qr-bg2.jpeg')` }}>
      <div className="overlay" />
      <motion.div
        className="auth-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div className="auth-box glass" whileHover={{ scale: 1.01 }}>
          <h2>Register on <span className="gold">PixQR</span></h2>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="regBtn">Register</button>
            {err && <p className="error">{err}</p>}
          </form>
          <p className="redirect">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Login</span>
          </p>
        </motion.div>
      </motion.div>
    </div>
    </>
  );
};

export default Register;
