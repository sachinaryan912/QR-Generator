// src/pages/Register.jsx
import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, database } from "../firebase";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/Login.css"; // reuse login.css

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
  );
};

export default Register;
