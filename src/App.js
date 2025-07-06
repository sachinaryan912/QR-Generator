import React, { useState } from "react";
import FancyQRCode from "./components/FancyQRCode";
import "./App.css";

function App() {
  const [link, setLink] = useState("");

  return (
    <div className="app">
      <h1 className="title">QR Code Generator</h1>
      <input
        className="input"
        placeholder="Paste your link here..."
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      {link && <FancyQRCode url={link} />}
    </div>
  );
}

export default App;
