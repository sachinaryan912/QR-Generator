import React, { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Generator = ({ link, setLink }) => {
  const navigate = useNavigate();
  const user = auth.currentUser;


  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/login");
    }
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div style={{ color: "#fff", padding: "2rem", background: "#000", minHeight: "100vh" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>QR Code Generator</h2>
        <div>
          <span style={{ marginRight: "1rem", color: "#f5d442" }}>
            {user?.displayName || user?.username}
          </span>
          <button
            onClick={handleLogout}
            style={{
              padding: "0.4rem 1rem",
              background: "#f5d442",
              border: "none",
              borderRadius: "8px",
              color: "#000",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <input
        type="text"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="Enter your link"
        style={{
          padding: "0.75rem",
          width: "80%",
          borderRadius: "10px",
          border: "none",
          outline: "none",
          marginTop: "2rem",
          fontSize: "1rem",
        }}
      />
    </div>
  );
};

export default Generator;
