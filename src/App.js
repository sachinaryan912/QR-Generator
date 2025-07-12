import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage"; // adjust if it's in another folder
import Generator from "./pages/Generator";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import UrlQRPage from "./pages/UrlQRPage";
import TextQRPage from "./pages/TextQRPage";
import EmailQRPage from "./pages/EmailQRPage";
import WiFiQRPage from "./pages/WiFiQRPage";
import VCardQRPage from "./pages/VCardQRPage";
import SmsQRPage from "./pages/SmsQRPage";
import LocationQRPage from "./pages/LocationQRPage";
import QRGenerator from "./components/QRGenerator"; // adjust if it's in another folder

function App() {
  const [link, setLink] = useState("");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/fancy" element={<QRGenerator />} />
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
