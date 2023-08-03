const mongoose = require("mongoose");

// Todo Schema
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required."],
    minLength: [2, "Title must be minimum 2 Characters"],
    maxLength: [30, "Title can't be more than 30 Characters"],
  },
  todo: {
    type: String,
    required: [true, "Todo is required."],
    minLength: [3, "Todo must be minimum 3 Characters"],
    maxLength: [100, "Todo can't be more than 100 Characters"],
  },
  status: {
    type: String,
    enum: ["incomplete", "completed"],
    default: "incomplete",
  },
});

// Todo Model
const Todo = mongoose.model("TodoModel", todoSchema);
module.exports = Todo;
