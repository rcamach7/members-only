const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  membership: { type: Boolean, default: false },
});

//Export model
module.exports = mongoose.model("User", User);
