const Todo = require('../models/todo.model')

module.exports.todo_create = async function(req, res) {
  try {
    const {
      text,
      due_date,
      status,
      priority,
      label
    } = req.body

    const createdTodo = await Todo.create({
      text,
      due_date,
      status,
      priority,
      label
    })
    res.json({
      success: true,
      data: createdTodo
    })
  } catch (error) {
    res.json({
      success: false,
      message: error
    })
  }

}
module.exports.todo_list = async function(req, res) {
  try {
    const todoList = await Todo.find({})
    res.json(todoList)

  } catch (error) {
    res.json(error)
  }

}