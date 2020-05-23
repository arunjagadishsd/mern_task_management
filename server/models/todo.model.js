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
    type: Schema.Types.ObjectId,
    ref: 'Status'

  },
  priority: {
    type: String,
    required: true,
    enum: ['P1', 'P2', 'P3', 'P4'],
  },
  due_date: {
    type: Date
  },
  created_date: {
    type: Date
  }

})
module.exports = Todo = model('Todo', todoSchema)