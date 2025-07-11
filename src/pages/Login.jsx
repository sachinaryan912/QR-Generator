import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, provider, database } from "../firebase";
import { ref, set, get, child } from "firebase/database";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import googleIcon from "../assets/google-ic.png";
import Loader from "../components/Loader"; // ✅ Import loader

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false); // ✅ Loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) navigate("/home");
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ Start loader
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (error) {
      setErr("Invalid email or password");
      setLoading(false); // ✅ Stop loader on error
    }
  };

  const handleGoogle = async () => {
    setLoading(true); // ✅ Start loader
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userRef = ref(database, `users/${user.uid}`);
      const snapshot = await get(child(ref(database), `users/${user.uid}`));

      if (!snapshot.exists()) {
        await set(userRef, {
          username: user.displayName || "GoogleUser",
          email: user.email,
          token: 5,
          createdAt: new Date().toISOString(),
          level: 0,
        });
      }

      navigate("/home");
    } catch (error) {
      setErr("Google login failed");
      setLoading(false); // ✅ Stop loader on error
    }
  };

  // ✅ Show loader while logging in
  if (loading) {
    return <Loader text="Logging you in securely..."/>;
  }

  return (
    <div
      className="login-bg"
      style={{ backgroundImage: `url('/assets/qr-bg2.jpeg')` }}
    >
      <div className="overlay" />
      <motion.div
        className="auth-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div className="auth-box glass" whileHover={{ scale: 1.01 }}>
          <h2>
            Login to <span className="gold">PixQR</span>
          </h2>
          <form onSubmit={handleLogin}>
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
            <button type="submit" className="loginBtn">
              Login
            </button>
            <button
              type="button"
              onClick={handleGoogle}
              className="google-btn"
            >
              <img src={googleIcon} alt="Google" />
              Continue with Google
            </button>
            {err && <p className="error">{err}</p>}
          </form>
          <p className="redirect">
            Don’t have an account?{" "}
            <span onClick={() => navigate("/register")}>Register</span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
