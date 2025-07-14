import React from "react";
import { Draggable } from "@hello-pangea/dnd";

import { FaUser } from "react-icons/fa";

const TaskCard = ({ id, task, index }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          className="task-card"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <p>{task.title}</p>
          <div className="assigned-user">
            <FaUser />
            <span>{task.assignedTo || "Unassigned"}</span>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
