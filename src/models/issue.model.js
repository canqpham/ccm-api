const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const IssueSchema = new Schema(
  {
    project: {type: ObjectId, ref: 'projects'},
    assigneeAccount: {type: ObjectId, ref: 'users'},
    issueKey: {type: String, required: true},
    creator: {type: String, required: true}, // creator's name
    reporter: {type: ObjectId, ref: 'users'},
    issueType: {type: ObjectId, ref: 'issueTypes'}, //story, subTack, epic
    summary: {type: String, required: true},
    description: {type: String},
    priority: {type: ObjectId, ref: 'priorities'},
    // issueStatus: {type: ObjectId, ref: 'issueStatus'}, // to do, in progress, test, done
    sprint: {type: ObjectId, ref: 'sprints'},
    workflow: {type: ObjectId, ref: 'workflow'}, // to do, in progress, test, done
    attachs: [{type: String}], // Save url of file
    subTaskOfIssue: {type: ObjectId, ref: 'issues'}, // a subTask belong only issue
    label: {type: ObjectId, ref: 'labels'},
    resloved: {type: Date},
    estimateTime: {type: String},
    actualTime: {type: String},
    vote: {type: Number},
    version: {type: ObjectId, ref: 'versions'},
    sequence: {type: Number} // 1, 2, 3, 4, ...
  },
  {
    collection: 'issues',
    timestamps: true,
  },
);

const IssueModel = mongoose.model("issues", IssueSchema);

export default IssueModel;