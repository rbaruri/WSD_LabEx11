import React, { useState, useEffect } from "react";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTask, setEditTask] = useState(null);
  const [editedTask, setEditedTask] = useState("");
  const [disabledEditButtons, setDisabledEditButtons] = useState([]);

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
      const updatedTasks = [...tasks, { name: newTask, checked: false }];
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

    // Update local storage with the updated task list
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);

    // Update local storage with the updated task list
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const toggleCheckbox = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].checked = !updatedTasks[index].checked;
    setTasks(updatedTasks);

    // Disable the "Edit" button for the checked task
    if (updatedTasks[index].checked) {
      setDisabledEditButtons((prevDisabledButtons) => [
        ...prevDisabledButtons,
        index,
      ]);
    } else {
      // Enable the "Edit" button if the user unchecks the task
      setDisabledEditButtons((prevDisabledButtons) =>
        prevDisabledButtons.filter((disabledIndex) => disabledIndex !== index)
      );
    }
  };

  const handleEditInputChange = (event) => {
    setEditedTask(event.target.value);
  };

  const handleEditClick = (index) => {
    setEditedTask(tasks[index].name); // Use task name
    setEditTask(index);
  };

  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          <div>
            <div className="card bg-base-100 shadow-xl max-h-screen">
              <div className="card-body">
                <h2 className="card-title">Task List</h2>
                <div className="divider"></div>
                <div className="flex items-center space-x-5">
                  <input
                    type="text"
                    placeholder="Add a new task"
                    value={newTask}
                    className="input input-bordered input-info w-full max-w-xs"
                    onChange={(e) => setNewTask(e.target.value)}
                    key="newTask"
                  />
                  <button
                    className="btn btn-secondary normal-case text-l px-7"
                    onClick={addTask}
                  >
                    Add
                  </button>
                </div>
              </div>
              <div className="card-actions">
                <div className="overflow-x-auto" style={{ width: "100%" }}>
                  <table className="table table-sm table-zebra mx-auto">
                    <thead className="text-center">
                      <tr>
                        <th>Checkbox</th>
                        <th>Task</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tasks.map((task, index) => (
                        <tr
                          key={index}
                          className={task.checked ? "bg-success" : ""}
                        >
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                className="checkbox"
                                checked={task.checked}
                                onChange={() => toggleCheckbox(index)}
                                key={`checkbox-${index}`}
                              />
                            </label>
                          </td>
                          <td className="p-2">
                            {editTask === index ? (
                              <div>
                                <input
                                  type="text"
                                  value={editedTask}
                                  onChange={handleEditInputChange}
                                  key={`edit-input-${index}`}
                                  className="input input-bordered input-sm w-full max-w-xs"
                                />
                              </div>
                            ) : (
                              <span>{task.name}</span>
                            )}
                          </td>
                          <td className="text-center p-2">
                            {editTask === index ? (
                              <button
                                className="btn btn-primary btn-sm mr-2"
                                onClick={() =>
                                  updateTask(index, {
                                    ...tasks[index],
                                    name: editedTask,
                                  })
                                }
                              >
                                Save
                              </button>
                            ) : (
                              <div>
                                <button
                                  className="btn btn-info btn-sm mr-2"
                                  onClick={() => handleEditClick(index)}
                                  disabled={disabledEditButtons.includes(index)}
                                >
                                  Edit
                                </button>
                                <button
                                  className="btn btn-error btn-sm"
                                  onClick={() => deleteTask(index)}
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <br />
            </div>
          </div>
        </div>

        <div className="drawer-side bg-gray-900 text-white w-64 p-4">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="my-4 mx-auto text-center">
            <img
              src="https://i.imgur.com/sETrkfF.png"
              alt="Logo"
              className="h-12 w-12 mx-auto mb-2"
            />
            <div className="text-lg font-semibold">TaskBloom</div>
            <hr className="my-2 border-gray-600" />{" "}
            {/* Divider after app name */}
          </div>
          <ul className="menu mt-8">
            <li className="text-base mb-4">
              <a className="block text-gray-300 hover:text-white">Profile</a>
            </li>
            <li className="text-base mb-4">
              <a className="block text-gray-300 hover:text-white">Progress</a>
            </li>
            <li className="text-base mb-4">
              <a className="block text-gray-300 hover:text-white">
                Upgrade (PRO)⭐
              </a>
            </li>
            <hr className="my-2 border-gray-600" />
            <li className="text-base">
              <a className="block text-gray-300 hover:text-white">Settings</a>
            </li>
            {/* Divider before "Settings" */}
            <li className="text-base">
              <a className="block text-gray-300 hover:text-white">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
