const express = require("express");
const todoController = require("../controllers/todo.controller");

const router = express.Router();

router.post("/add", todoController.addTodo);
router.get("/get", todoController.getAllTodos);
router.put("/update/:id", todoController.updateTodo);
router.delete("/delete/:id", todoController.deleteTodo);

module.exports = router;
