const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  const task = await Task.create({
    title: req.body.title,
    user: req.user._id,
  });

  res.status(201).json(task);
};

exports.getTasks = async (req, res) => {
  const { search } = req.query;

  const query = {
    user: req.user._id,
    ...(search && { title: { $regex: search, $options: "i" } }),
  };

  const tasks = await Task.find(query);
  res.json(tasks);
};

exports.updateTask = async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true }
  );

  res.json(task);
};

exports.deleteTask = async (req, res) => {
  await Task.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  res.json({ success: true });
};
