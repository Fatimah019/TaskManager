const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const taskSchema = new Schema({
  taskname: { type: String },
  taskstartdate: { type: String },
  endDate: { type: String },
  taskPlan: { type: String },
  category: { type: String },
  complete: { type: Boolean, default: false },
});

module.exports = Mongoose.model("TaskManager", taskSchema);
