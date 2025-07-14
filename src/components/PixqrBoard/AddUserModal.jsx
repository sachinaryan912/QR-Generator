// src/components/AddUserModal.jsx
import React, { useState } from "react";
import { database } from "../../firebase";
import { ref, push } from "firebase/database";

const AddUserModal = ({ onClose }) => {
  const [name, setName] = useState("");

  const handleAdd = () => {
    if (name.trim()) {
      push(ref(database, "boardusers"), { name });
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add User</h2>
        <input
          type="text"
          placeholder="User Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
        <button onClick={onClose} className="cancel-btn">Cancel</button>
      </div>
    </div>
  );
};

export default AddUserModal;
