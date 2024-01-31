import Task from "../models/taskmodel.js";

//Controller functions to define CRUD logic

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ deadline: 1 });
    res.json(tasks);
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getPendingTasks = async (req, res) => {
  try {
    const pendingTasks = await Task.find({ completed: false }).sort({
      deadline: 1,
    });
    res.json(pendingTasks);
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getCompletedTasks = async (req, res) => {
  try {
    const completedTasks = await Task.find({ completed: true }).sort({
      updatedAt: 1,
    });
    res.json(completedTasks);
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const setTaskAsCompleted = async (req, res) => {
  const { id } = req.params;
  try {
    const taskToUpdate = await Task.findById(id);
    if (!taskToUpdate) {
      return res.status(404).json({ message: "Task not found" });
    }
    taskToUpdate.completed = true;
    const updatedTask = await taskToUpdate.save();
    res.json(updatedTask);
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createTask = async (req, res) => {
  const { title, description, deadline } = req.body;
  try {
    const newTask = new Task({
      title,
      description,
      deadline,
    });
    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await Task.deleteOne({ _id: id });
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(deletedTask);
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
