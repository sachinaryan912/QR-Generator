// src/components/AddTaskModal.jsx
import React, { useState, useEffect } from "react";
import { database } from "../../firebase";
import { ref, push, onValue } from "firebase/database";

const AddTaskModal = ({ onClose, column }) => {
  const [title, setTitle] = useState("");
  const [users, setUsers] = useState([]);
  const [assignedTo, setAssignedTo] = useState("");

  useEffect(() => {
    const usersRef = ref(database, "boardusers");
    onValue(usersRef, (snap) => {
      const data = snap.val() || {};
      const list = Object.values(data).map((u) => u.name);
      setUsers(list);
    });
  }, []);

  const handleCreate = () => {
    if (title.trim()) {
      push(ref(database, `tasks/${column}`), {
        title,
        assignedTo,
      });
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>New Task in {column.toUpperCase()}</h2>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)}>
          <option value="">Unassigned</option>
          {users.map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>
        <button onClick={handleCreate}>Create</button>
        <button onClick={onClose} className="cancel-btn">Cancel</button>
      </div>
    </div>
  );
};

export default AddTaskModal;
