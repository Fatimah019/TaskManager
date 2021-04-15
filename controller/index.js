const { TaskManager, TaskManagerUser } = require("../model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.Signup = async (req, res) => {
  req.check("email", "make sure you fill in your email").notEmpty();
  req.check("username", "make sure you fill in your username").notEmpty();
  req
    .check("email", "make sure your email is correct and in the right format")
    .isEmail();
  req
    .check("password", "password should contain more than 5 characters")
    .isLength({
      min: 6,
      max: 20,
    });

  // check for first error and signal error message
  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.json({
      status: false,
      message: firstError,
    });
  }

  const { email, username, password } = req.body;
  try {
    // check if email exists
    let checkuser = await TaskManagerUser.findOne({ email });
    if (checkuser) {
      return res.json({
        status: false,
        message: "user exists already",
      });
    }

    let checkusername = await TaskManagerUser.findOne({ username });
    if (checkusername) {
      return res.json({
        status: false,
        message: "username has been taken",
      });
    }

    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        res.json(err);
      } else {
        const user = new TaskManagerUser({
          email,
          username,
          password: hash,
        });
        user
          .save()
          .then((user) => {
            return res.json({
              status: true,
              message: "Signedup Successfully",
              data: user,
            });
          })
          .catch((err) => {
            res.json({
              status: false,
              message: err,
            });
          });
      }
    });
  } catch (err) {
    res.json({
      status: false,
      message: err,
    });
  }
};

//login
exports.Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await TaskManagerUser.findOne({ email });
    if (!user) {
      return res.json({
        status: false,
        message: "User does not exist",
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.json({
        status: false,
        message: "password is incorrect",
      });
    } else {
      const payload = {
        id: user.id,
      };

      const token = jwt.sign(payload, process.env.DB_SECRET);
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + 900000),
      });
      return res.json({
        status: true,
        token,
        data: payload,
      });
    }
  } catch (err) {
    return res.json({
      status: false,
      message: err,
    });
  }
};

exports.GetUser = (req, res) => {
  TaskManagerUser.findOne({
    _id: req.params.id,
  })
    // .populate({ path: "task" })
    .then((user) => {
      return res.json({
        status: true,
        data: user,
      });
    })
    .catch((err) => {
      return res.json({
        status: false,
        message: err,
      });
    });
};

// create product post
exports.NewTask = async (req, res, file) => {
  try {
    TaskManager.create({
      taskname: req.body.taskname,
      taskPlan: req.body.taskPlan,
      taskstartdate: req.body.taskstartdate,
      endDate: req.body.endDate,
      category: req.body.category,
    })
      .then((taskdb) => {
        TaskManagerUser.findByIdAndUpdate(
          { _id: req.params.id },
          { $push: { task: taskdb._id } },
          { new: true }
        )
          .then((task) => {
            return res.json({
              status: true,
              data: task,
            });
          })
          .catch((err) => {
            res.json({
              status: false,
              message: "User Cannot Be Updated",
            });
          });
      })
      .catch((err) => {
        res.json({
          status: false,
          message: "Task Could Not Be Created",
        });
      });
  } catch (err) {
    res.json({
      status: false,
      message: "An Error Occurred!",
    });
  }
};

// get a task
exports.GetTask = (req, res) => {
  TaskManager.findOne({ _id: req.params.id })
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
  TaskManagerUser.findOne({
    _id: req.params.id,
  })
    .populate({ path: "task" })
    .then((tasks) => {
      return res.json({
        status: true,
        data: tasks.task,
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
  TaskManager.findByIdAndUpdate(
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
  TaskManager.findOneAndDelete({ _id: req.params.id })
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
  TaskManager.findByIdAndUpdate(
    { _id: req.params.id },
    {
      taskname: req.body.taskname,
      taskstartdate: req.body.taskstartdate,
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
