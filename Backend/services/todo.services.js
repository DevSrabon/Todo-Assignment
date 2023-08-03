const Todo = require("../models/Todo");

// Service functions

const getAllTodos = async () => {
  return await Todo.find();
};

const addTodo = async (body) => {
  return await Todo.create(body);
};

const updateTodo = async (todoId, body) => {
  return await Todo.findByIdAndUpdate(todoId, body, { new: true });
};

const deleteTodo = async (todoId) => {
  return await Todo.findByIdAndDelete(todoId);
};

module.exports = {
  getAllTodos,
  addTodo,
  updateTodo,
  deleteTodo,
};
