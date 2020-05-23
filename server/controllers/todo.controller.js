const Todo = require('../models/todo.model')

module.exports.todo_create = async function(req, res) {
  const {
    text,
    due
  } = req.body
  console.log(text, due)

  const todo = await Todo.create({
    text,
    due
  })
  res.json(todo)
}
module.exports.todo_list = async function(req, res) {
  const todoList = await Todo.find({})
  console.log(todoList);
  res.json(todoList)
}