const express = require("express");
const router = express.Router();
const task = require("../controller");

// create new task
router.post("/new/task", task.NewTask);

// get tasks
router.post("/tasks", task.GetAllTasks);

// get a task
router.post("/task/:id", task.GetTask);

// saved finished task
router.put("/complete/task/:id", task.CompleteTask);

// edit todo
router.put("/edit/task/:id", task.EditTodo);

// delete task
router.delete("/delete/task/:id", task.DeleteTask);

// create todo details
router.post("/todo/details/:id", task.CreateDetails);

module.exports = router;
