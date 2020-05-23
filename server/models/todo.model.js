const mongoose = require('mongoose')
const {
  Schema,
  model
} = mongoose

const todoSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  label: {
    type: Schema.Types.ObjectId,
    ref: 'Label'
  },
  status: {
    type: String,
    required: true,
    default: 'New',
    enum: ['New', 'In progress', 'Completed']
  },
  priority: {
    type: String,
    required: true,
    default: 'P4',
    enum: ['P1', 'P2', 'P3', 'P4']
  },
  due_date: {
    type: Date
  },
  created_date: {
    type: Date
  }

})
module.exports = Todo = model('Todo', todoSchema)