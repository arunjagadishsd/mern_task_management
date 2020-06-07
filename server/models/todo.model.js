const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const todoSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  text: {
    type: String,
    required: true,
  },
  label: {
    type: Schema.Types.ObjectId,
    ref: "Label",
  },
  status: {
    type: Schema.Types.ObjectId,
    ref: "Status",
  },
  priority: {
    type: String,
    required: true,
    default: "P4",
    enum: ["P1", "P2", "P3", "P4"],
  },
  dueDdate: {
    type: Date,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});
module.exports = model("Todo", todoSchema);
