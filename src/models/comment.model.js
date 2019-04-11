
const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const CommentSchema = new Schema(
  {
    issue: {type: ObjectId, ref: 'issues'},
    content: {type: String}, // to do, in progress, test, deploy, done
    creator: {type: ObjectId, ref: 'users'},
    image: {type: String},
    attach: {type: String},
    end: {type: Boolean},
    to: [{type: ObjectId}]
  },
  {
    collection: 'comments',
    timestamps: true,
  },
);

const CommentModel = mongoose.model("comments", CommentSchema);

export default CommentModel;