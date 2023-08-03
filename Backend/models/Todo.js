const mongoose = require("mongoose");

// Todo Schema
const todoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: [true, "Todo is required."],
    minLength: [3, "Minimum 3 Characters are required"],
    maxLength: [50, "Maximum 50 Characters are allowed"],
  },
  status: {
    type: String,
    required: true,
    enum: ["incomplete", "completed"],
    default: "incomplete",
  },
});

// Todo Model
const Todo = mongoose.model("TodoModel", todoSchema);
module.exports = Todo;
