
const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const CommentSchema = new Schema(
  {
    issue: {type: ObjectId, ref: 'issues', required: true},
    content: {type: String},
    creator: {type: ObjectId, ref: 'users', required: true},
    attach: {type: String},
    tagMembers: [{type: ObjectId, ref: 'users'}],
    tagIssues: [{type: ObjectId, ref: 'issues'}],
  },
  {
    collection: 'comments',
    timestamps: true,
  },
);

const CommentModel = mongoose.model("comments", CommentSchema);

export default CommentModel;