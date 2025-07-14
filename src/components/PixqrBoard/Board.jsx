import React, { useEffect, useState } from "react";
import { DragDropContext} from "@hello-pangea/dnd";

import Column from "./Column";
import AddUserModal from "./AddUserModal";
import { database } from "../../firebase";
import { ref, onValue, set } from "firebase/database";

const columns = ["todo", "inprogress", "done"];

const Board = () => {
  const [tasks, setTasks] = useState({});
  const [openUserModal, setOpenUserModal] = useState(false);

  useEffect(() => {
    const tasksRef = ref(database, "tasks");
    onValue(tasksRef, (snapshot) => {
      setTasks(snapshot.val() || {});
    });
  }, []);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const { draggableId, source, destination } = result;

    const updatedTasks = { ...tasks };
    const movedTask = updatedTasks[source.droppableId][draggableId];

    delete updatedTasks[source.droppableId][draggableId];
    if (!updatedTasks[destination.droppableId]) {
      updatedTasks[destination.droppableId] = {};
    }
    updatedTasks[destination.droppableId][draggableId] = movedTask;

    set(ref(database, "tasks"), updatedTasks);
  };

  return (
    <>
      <div className="board-header">
        <button onClick={() => setOpenUserModal(true)}>Add User</button>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="board">
          {columns.map((col) => (
            <Column key={col} title={col} tasks={tasks[col] || {}} />
          ))}
        </div>
      </DragDropContext>
      {openUserModal && <AddUserModal onClose={() => setOpenUserModal(false)} />}
    </>
  );
};

export default Board;
