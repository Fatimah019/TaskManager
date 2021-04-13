const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const todoDetailSchema = new Schema({
  details: { type: String },
});

module.exports = Mongoose.model("TodoDetail", todoDetailSchema);
