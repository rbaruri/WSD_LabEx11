import React, { useState, useEffect } from "react";
import "daisyui/dist/full.css"; // Import Daisy UI styles
import "./TaskList.css"; // Your custom CSS

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTask, setEditTask] = useState(null);
  const [editedTask, setEditedTask] = useState("");

  useEffect(() => {
    try {
      const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      console.log("Stored tasks:", storedTasks);
      if (storedTasks.length > 0) {
        setTasks(storedTasks);
      }
    } catch (error) {
      console.error("Error loading tasks from local storage:", error);
    }
  }, []);

  const addTask = () => {
    if (newTask.trim() !== "") {
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      setNewTask("");

      // Update local storage with the new task list
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  };

  const updateTask = (index, updatedTask) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = updatedTask;
    setTasks(updatedTasks);
    setEditTask(null);
    setEditedTask("");
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const handleEditInputChange = (event) => {
    setEditedTask(event.target.value);
  };

  const handleEditClick = (index) => {
    setEditedTask(tasks[index]);
    setEditTask(index);
  };

  // Save tasks to local storage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]); // This effect will run whenever tasks change

  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          <div>
            <h1 className="text-3xl font-bold mb-4">Task List</h1>

            <div className="flex items-center space-x-5 mb-4">
              <input
                type="text"
                placeholder="Add a new task"
                value={newTask}
                className="input input-bordered input-info w-full max-w-xs"
                onChange={(e) => setNewTask(e.target.value)}
              />
              <button
                className="btn btn-secondary normal-case text-lg"
                onClick={addTask}
              >
                Add
              </button>
            </div>

            <ul className="space-y-4">
              {tasks.map((task, index) => (
                <li key={index} className="flex items-center space-x-2">
                  {editTask === index ? (
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={editedTask}
                        onChange={handleEditInputChange}
                        className="input input-bordered input-sm w-full max-w-xs"
                      />
                      <button
                        className="btn btn-ghost normal-case text-xl"
                        onClick={() => updateTask(index, editedTask)}
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span>{task}</span>
                      <button
                        className="btn btn-primary normal-case text-xl"
                        onClick={() => handleEditClick(index)}
                      >
                        Edit
                      </button>
                    </div>
                  )}
                  <button
                    className="btn btn-error normal-case text-xl"
                    onClick={() => deleteTask(index)}
                  >
                    Delete
                  </button>
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
            <li>
              <a>Home</a>
            </li>
            <li>
              <a>Task List</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
