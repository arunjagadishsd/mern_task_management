const Todo = require('../models/todo.model')
const Label = require('../models/label.model')

module.exports.todo_create = async function(req, res) {
  const {
    text,
    due_date,
    status,
    priority,
    label
  } = req.body
  const created_date = new Date()
  const labelId = Label.find({
    text: label
  })
  const todo = await Todo.create({
    text,
    due_date,
    status,
    priority,
    created_date,
    labelId
  })
  res.json(todo)
}
module.exports.todo_list = async function(req, res) {
  const todoList = await Todo.find({})
  res.json(todoList)
}