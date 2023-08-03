const todoService = require("../services/todo.services");

// Controller functions

const getAllTodos = async (req, res) => {
  try {
    const todos = await todoService.getAllTodos();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const addTodo = async (req, res) => {
  try {
    const todo = await todoService.addTodo(req.body);
    res.status(201).json(todo);
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      res
        .status(400)
        .json({ error: "Validation failed", messages: validationErrors });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

const updateTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    const updatedTodo = await todoService.updateTodo(todoId, req.body);
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    const todo = await todoService.deleteTodo(todoId);
    if (!todo) {
      return res.status(204).json({ error: "No Todo found" });
    } else {
      res.status(204).json({ status: "Deleted SuccessFully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllTodos,
  addTodo,
  updateTodo,
  deleteTodo,
};
