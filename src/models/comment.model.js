
const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const CommentSchema = new Schema(
  {
    content: {type: String}, // to do, in progress, test, deploy, done
    creator: {type: ObjectId, required: true},
    image: {type: String},
    attach: {type: ObjectId},
    end: {type: Boolean},
    to: [{type: ObjectId}]
  },
  {
    collection: 'comments',
    timestamps: true,
  },
);

const CommentModel = mongoose.model("Comment", CommentSchema);

export default CommentModel;