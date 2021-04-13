const { Todo, TodoDetail } = require("../model");

// create product post
exports.NewTask = async (req, res) => {
  // check that task name is not empty
  req.check("name", "task name cannot be empty").notEmpty();

  try {
    let task = new Todo({
      taskname: req.body.taskname,
      startdate: req.body.startdate,
      endDate: req.body.endDate,
      category: req.body.category,
    });
    task.save((err, taskitem) => {
      if (err) {
        return res.json({
          status: false,
          message: `Error Occurred. Couldnt save task.`,
        });
      } else {
        return res.json({
          status: true,
          data: taskitem,
        });
      }
    });
  } catch (err) {
    return res.json({
      status: false,
      message: "Error Occurred.",
    });
  }
};

// get a task
exports.GetTask = (req, res) => {
  Todo.findOne({ _id: req.params.id })
    .then((task) => {
      return res.json({
        status: true,
        data: task,
      });
    })
    .catch(() => {
      return res.json({
        status: false,
        message: `Error while Fetching Task`,
      });
    });
};
// Get all tasks
exports.GetAllTasks = (req, res) => {
  Todo.find()
    .then((tasks) => {
      return res.json({
        status: true,
        data: tasks,
      });
    })
    .catch(() => {
      return res.json({
        status: false,
        message: `Error while Fetching All Tasks`,
      });
    });
};

// complete a task
exports.CompleteTask = (req, res) => {
  Todo.findByIdAndUpdate(
    { _id: req.params.id },
    {
      complete: true,
    },
    { new: true }
  )
    .then((editedTask) => {
      return res.json({
        status: true,
        data: editedTask,
      });
    })
    .catch((err) => {
      return res.json({
        status: false,
        message: `Task Cannot Be Completed ${err}`,
      });
    });
};

// delete a post
exports.DeleteTask = async (req, res) => {
  Todo.findOneAndDelete({ _id: req.params.id })
    .then(() => {
      return res.json({
        status: true,
        message: "Task Deleted",
      });
    })
    .catch((err) => {
      return res.json({
        status: false,
        message: `Cannot Delete Task ${err}`,
      });
    });
};

// edit todo
exports.EditTodo = (req, res) => {
  Todo.findByIdAndUpdate(
    { _id: req.params.id },
    {
      taskname: req.body.taskname,
      startdate: req.body.startdate,
      endDate: req.body.endDate,
      category: req.body.category,
    },
    { new: true }
  )
    .then((data) => {
      return res.json({
        status: true,
        data: data,
      });
    })
    .catch((err) => {
      return res.json({
        status: false,
        message: "Cannot Edit Task",
      });
    });
};

// find a todo and update details
exports.CreateDetails = () => {
  let tododetails = new TodoDetail({
    details: req.body.details,
  });
  try {
    tododetails.save((err, detail) => {
      if (err) {
        return res.json({
          status: false,
          message: "Cannot create details of this task",
        });
      } else {
        Todo.findByIdAndUpdate(
          { _id: id },
          { $push: { tododetails: detail._id } },
          { new: true }
        )
          .then((tododetail) => {
            return res.json({
              status: true,
              data: tododetail,
            });
          })
          .catch((err) => {
            res.json({
              status: false,
              message: "product not created" + err,
            });
          });
      }
    });
  } catch (err) {
    return res.json({
      status: false,
      message: "Unable to create details of this task",
    });
  }
};
