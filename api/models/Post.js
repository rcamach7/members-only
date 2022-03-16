const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Post = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  timeStamp: { type: Date, default: Date.now },
  title: { type: String, required: true },
  message: { type: String, required: true },
});

module.exports = mongoose.model("Post", Post);
