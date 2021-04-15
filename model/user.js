const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const todoUsersSchema = new Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  task: [{ type: Schema.Types.ObjectId, ref: "TaskManager" }],
});

module.exports = Mongoose.model("TaskManagerUser", todoUsersSchema);
