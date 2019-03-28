const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const IssueSchema = new Schema(
  {
    assigneeAccount: {type: ObjectId},
    issueKey: {type: String},
    creator: {type: String, required: true},
    issueType: {type: ObjectId, ref: 'issueTypes'},
    summary: {type: String, required: true},
    description: {type: String},
    priority: {type: ObjectId, ref: 'priorities'},
    issueStatus: {type: ObjectId, ref: 'issueStatus'}, // to do, in progress, test, done
    sprints: [{type: ObjectId, ref: 'sprints'}],
    attach: {type: ObjectId, ref: 'attachs'},
    subTask: [{type: ObjectId, ref: 'issues'}]
  },
  {
    collection: 'issues',
    timestamps: true,
  },
);

const IssueModel = mongoose.model("Issue", IssueSchema);

export default IssueModel;