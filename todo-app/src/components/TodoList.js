import React, { useState, useEffect } from "react";
import { fetchData } from "../services/api";
import TodoItem from "./TodoItem";

const TodoList = ({ token }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [error, setError] = useState("");

  // Fetch tasks on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await fetchData("/tasks", "GET", null, token);
        setTasks(data);
      } catch (err) {
        setError(err.message);
      }
    };

    if (token) {
      fetchTasks();
    }
  }, [token]);

  // Handle new task submission
  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const newTaskData = { title: newTask, description: "" }; // You can extend to add more fields if necessary
      const data = await fetchData("/tasks", "POST", newTaskData, token);
      setTasks([...tasks, data]);
      setNewTask("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Todo List</h2>
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          required
        />
        <button type="submit">Add Task</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        {tasks.length === 0 ? (
          <p>No tasks found. Add a new task!</p>
        ) : (
          tasks.map((task) => (
            <TodoItem
              key={task.taskId}
              task={task}
              token={token}
              setTasks={setTasks}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;
