/* eslint-disable no-underscore-dangle */
const Todo = require("../models/todo.model");
const HttpError = require("../models/http-error");

module.exports.todoCreate = async function (req, res) {
  try {
    const { text, dueDate, status, priority, label } = req.body;
    const { user } = req;

    const createdTodo = await Todo.create({
      // eslint-disable-next-line no-underscore-dangle
      user: user._id,
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
    const queryParams = req.query;
    console.log("queryParams", queryParams);

    const { user } = req;
    const todoList = await Todo.find({
      $or: [user, { ...queryParams }],
    });
    console.log(todoList);
    res.json(todoList);
  } catch (error) {
    console.log("error", error);
    res.json(error);
  }
};
// eslint-disable-next-line consistent-return
module.exports.todoDelete = async (req, res, next) => {
  const { user } = req;
  const todoId = req.params.tid;
  let todo;
  try {
    todo = await Todo.findById(todoId).populate("user");
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete todo.",
      500
    );
    next(error);
  }
  if (!todo) {
    const error = new HttpError("Could not find todo for this id.", 404);
    return next(error);
  }

  if (todo.user.id !== user.id) {
    const error = new HttpError(
      "You are not allowed to delete this todo.",
      401
    );
    return next(error);
  }
  await todo.remove();
  res.status(200).json({ message: "Deleted Todo." });
};
module.exports.todoEdit = async (req, res, next) => {
  const { user } = req;
  const todoId = req.params.tid;
  let todo;
  try {
    todo = await Todo.findById(todoId).populate("user");
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete todo.",
      500
    );
    next(error);
  }
  if (!todo) {
    const error = new HttpError("Could not find todo for this id.", 404);
    return next(error);
  }

  if (todo.user.id !== user.id) {
    const error = new HttpError(
      "You are not allowed to delete this todo.",
      401
    );
    return next(error);
  }
  const { text, dueDate, status, priority, label } = req.body;
  todo.overwrite({ text, dueDate, status, priority, label });
  await todo.save();
  res.status(200).json({ message: "Update Todo." });
};
