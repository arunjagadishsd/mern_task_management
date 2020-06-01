const Todo = require("../models/todo.model");

module.exports.todoCreate = async function (req, res) {
  try {
    const { text, dueDate, status, priority, label } = req.body;

    const createdTodo = await Todo.create({
      text,
      dueDate,
      status,
      priority,
      label,
    });
    res.json({
      success: true,
      data: createdTodo,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
  }
};
module.exports.todoList = async function (req, res) {
  try {
    const todoList = await Todo.find({});
    res.json(todoList);
  } catch (error) {
    res.json(error);
  }
};
