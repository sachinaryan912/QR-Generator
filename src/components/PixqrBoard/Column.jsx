import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import AddTaskModal from "./AddTaskModal";

const Column = ({ title, tasks }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="column">
      <div className="column-header">
        <h2>{title.toUpperCase()}</h2>
        <button className="add-task-btn" onClick={() => setOpenModal(true)}>＋</button>
      </div>
      <Droppable droppableId={title}>
        {(provided) => (
          <div
            className="task-list"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {Object.entries(tasks).map(([id, task], index) => (
              <TaskCard key={id} id={id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {openModal && <AddTaskModal onClose={() => setOpenModal(false)} column={title} />}
    </div>
  );
};

export default Column;
