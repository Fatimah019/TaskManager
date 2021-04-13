const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const taskSchema = new Schema({
  taskname: { type: String, required: true },
  startdate: { type: String },
  endDate: { type: String },
  taskPlan: { type: String },
  category: { type: String },
  tododetails: [{ type: Schema.Types.ObjectId, ref: "TodoDetail" }],
  complete: { type: Boolean, default: false },
});

module.exports = Mongoose.model("Todo", taskSchema);
