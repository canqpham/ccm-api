const mongoose = require("mongoose");

const { Schema } = mongoose;

const ObjectId = mongoose.Types.ObjectId;

const bookModel = new Schema({
  title: { type: String },
  author: { type: String },
  userId: { type: ObjectId, required: true, ref: "User" }
});

module.exports = mongoose.model("Book", bookModel);
