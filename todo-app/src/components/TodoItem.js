import React, { useState } from "react";
import { fetchData } from "../services/api";

const TodoItem = ({ task, token, setTasks }) => {
  const [status, setStatus] = useState(task.status);
  const [error, setError] = useState("");

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    try {
      const updatedTask = await fetchData(
        `/tasks/${task.taskId}`,
        "PUT",
        { status: newStatus },
        token
      );
      setStatus(updatedTask.status);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    try {
      await fetchData(`/tasks/${task.taskId}`, "DELETE", null, token);
      setTasks((prevTasks) =>
        prevTasks.filter((t) => t.taskId !== task.taskId)
      );
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="card">
      <h3>{task.title}</h3>
      <p>{task.description || "No description provided"}</p>
      <p>Status: {status}</p>

      <select value={status} onChange={handleStatusChange}>
        <option value="pending">Pending</option>
        <option value="in progress">In Progress</option>
        <option value="done">Done</option>
        <option value="completed">Completed</option>
      </select>

      <button onClick={handleDelete}>Delete</button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default TodoItem;
