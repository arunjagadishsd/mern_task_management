import { Schema, Model } from 'mongoose'

const todoSchema = new Schema({
  text: String,
  due: Date
})
export default Model('todo', todoSchema)
