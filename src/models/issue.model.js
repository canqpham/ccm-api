const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const IssueSchema = new Schema(
  {
    project: {type: ObjectId, ref: 'projects'},
    assignee: [{type: ObjectId, ref: 'users'}],
    issueKey: {type: String, required: true},
    creator: {type: ObjectId, ref: 'users'}, // creator's name
    reporter: {type: ObjectId, ref: 'users'},
    issueType: {type: ObjectId, ref: 'issueTypes'}, //story, subTack, epic
    summary: {type: String, required: true},
    description: {type: String},
    priority: {type: ObjectId, ref: 'priorities'},
    sprint: {type: ObjectId, ref: 'sprints'},
    sprintHistory: [{type: String}],
    workflow: {type: ObjectId, ref: 'workflow'}, // to do, in progress, test, done
    attachs: [{type: String}], // Save url of file
    subTaskOfIssue: {type: ObjectId, ref: 'issues'}, // a subTask belong only issue
    label: [{type: String}],
    resloved: {type: Date},
    estimateTime: {type: String},
    actualTime: {type: String},
    vote: {type: Number},
    storyPoints: {type: Number},
    version: {type: ObjectId, ref: 'versions'},
    component: [{type: ObjectId, ref: 'components'}],
    closed: {type: Boolean, default: false},
    released: {type: Boolean, default: false}
  },
  {
    collection: 'issues',
    timestamps: true,
  },
);

const IssueModel = mongoose.model("issues", IssueSchema);

export default IssueModel;