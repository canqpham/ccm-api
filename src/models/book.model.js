const mongoose = require('mongoose');

const { Schema } = mongoose;

const BookSchema = new Schema(
  {
    title: String,
    author: String,
  },
);

const BookModel = mongoose.model("Book", BookSchema);
export default BookModel;