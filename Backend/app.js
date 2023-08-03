const express = require("express");
const cors = require("cors");
const app = express();
const todo = require("./router/todo.router");

// middleware
app.use(cors());
app.use(express.json());

// Router
app.use("/api/v1/todo", todo);

// server running
app.get("/", async (req, res) => {
  res.send("Server is running");
});

module.exports = app;
