const express = require("express");
const router = express.Router();
const task = require("../controller");

//register a user
router.post("/signup", task.Signup);

//log in a user
router.post("/login", task.Login);

//get a user
router.post("/user/:id", task.GetUser);

// create new task
router.post("/new/task/:id", task.NewTask);

// get tasks
router.post("/tasks/:id", task.GetAllTasks);

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
