const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const IssueTypeSchema = new Schema(
  {
    project: {type: ObjectId, ref: 'projects'},
    type: {type: String, required: true}, // story, bug, epic, subTask
    description: {type: String},
    iconUrl: {type: String},
    children: [{type: ObjectId, ref: 'issueTypes'}],
  },
  {
    collection: 'issueTypes',
    timestamps: true,
  },
);

const IssueTypeModel = mongoose.model("issueTypes", IssueTypeSchema);

export default IssueTypeModel;