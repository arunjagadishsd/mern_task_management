const mongoose = require('mongoose')
const { Schema, model } = mongoose

const todoSchema = new Schema({
  text: String,
  due: Date
})
module.exports = Todo = mongoose.model('todo', todoSchema)
