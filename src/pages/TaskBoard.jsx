import React from "react";
import Board from "../components/PixqrBoard/Board";
import "../styles/Board.css";
const TaskBoard = () => {
  return (
    <div className="app-container">
      <h1>🧩 PixQR Jira Board</h1>
      <Board />
    </div>
  );
};

export default TaskBoard;
