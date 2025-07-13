import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import UrlQRPage from "./pages/subpages/UrlQRPage";
import TextQRPage from "./pages/subpages/TextQRPage";
import EmailQRPage from "./pages/subpages/EmailQRPage";
import WiFiQRPage from "./pages/subpages/WiFiQRPage";
import VCardQRPage from "./pages/subpages/VCardQRPage";
import SmsQRPage from "./pages/subpages/SmsQRPage";
import LocationQRPage from "./pages/subpages/LocationQRPage";

function App() {
  const [link, setLink] = useState("");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/generate/url" element={<UrlQRPage />} />
        <Route path="/generate/text" element={<TextQRPage />} />
        <Route path="/generate/email" element={<EmailQRPage />} />
        <Route path="/generate/wifi" element={<WiFiQRPage />} />
        <Route path="/generate/vcard" element={<VCardQRPage />} />
        <Route path="/generate/sms" element={<SmsQRPage />} />
        <Route path="/generate/location" element={<LocationQRPage />} />

      </Routes>
    </Router>
  );
}

export default App;
