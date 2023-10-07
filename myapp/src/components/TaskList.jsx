import React, { useState } from "react";
import "./TaskList.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTask, setEditTask] = useState(null);
  const [editedTask, setEditedTask] = useState(""); // New state for edited task

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  };

  const updateTask = (index, updatedTask) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = updatedTask;
    setTasks(updatedTasks);
    setEditTask(null);
    setEditedTask(""); // Reset the edited task state
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const handleEditInputChange = (event) => {
    // Update the edited task state when the input changes
    setEditedTask(event.target.value);
  };

  const handleEditClick = (index) => {
    // Initialize the editedTask state with the current task text
    setEditedTask(tasks[index]);
    setEditTask(index);
  };

  return (
    <div>
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        <div>
          <h1>Task List</h1>

          <div className="flex items-center space-x-5">
            <input
              type="text"
              placeholder="Add a new task"
              value={newTask}
              className="input input-bordered input-info w-full max-w-xs"
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button
              className="btn btn-secondary normal-case text-l"
              onClick={addTask}
            >
              Add
            </button>
          </div>

          <ul>
            {tasks.map((task, index) => (
              <li key={index}>
                {editTask === index ? (
                  <div>
                    <input
                      type="text"
                      value={editedTask} // Use editedTask for the input value
                      onChange={handleEditInputChange}
                    />
                    <button onClick={() => updateTask(index, editedTask)}>
                      Save
                    </button>
                  </div>
                ) : (
                  <div>
                    <span>{task}</span>
                    <button onClick={() => handleEditClick(index)}>Edit</button>
                  </div>
                )}
                <button onClick={() => deleteTask(index)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          <li>
            <a>Home</a>
          </li>
          <li>
            <a>Task</a>
          </li>
        </ul>
      </div>
    </div>
    </div>
  );
};

export default TaskList;
