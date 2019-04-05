const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const IssueSchema = new Schema(
  {
    project: {type: ObjectId, ref: 'projects'},
    assigneeAccount: {type: ObjectId, ref: 'users'},
    issueKey: {type: String},
    creator: {type: String, required: true}, // creator's name
    issueType: {type: ObjectId, ref: 'issueTypes'}, //story, subTack, epic
    summary: {type: String, required: true},
    description: {type: String},
    priority: {type: ObjectId, ref: 'priorities'},
    issueStatus: {type: ObjectId, ref: 'issueStatus'}, // to do, in progress, test, done
    sprints: {type: ObjectId, ref: 'sprints'},
    attach: {type: ObjectId, ref: 'attachs'},
    subTaskOfIssue: {type: ObjectId, ref: 'issues'} // a subTask belong only issue
  },
  {
    collection: 'issues',
    timestamps: true,
  },
);

const IssueModel = mongoose.model("issues", IssueSchema);

export default IssueModel;