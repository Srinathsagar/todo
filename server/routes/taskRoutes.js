const express = require("express");
const Task = require("../models/Task");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Create a new task
router.post("/", protect, async (req, res) => {
  const { title, description } = req.body;

  try {
    const task = new Task({
      userId: req.user._id,
      title,
      description,
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get tasks for the authenticated user
router.get("/", protect, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update task status
router.put("/:taskId", protect, async (req, res) => {
  const { taskId } = req.params;
  const { status } = req.body;

  try {
    const task = await Task.findOne({ taskId, userId: req.user._id });
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.status = status;
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete task
router.delete("/:taskId", protect, async (req, res) => {
  const { taskId } = req.params;

  try {
    const task = await Task.findOneAndDelete({ taskId, userId: req.user._id });
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
