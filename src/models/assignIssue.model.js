
const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const AssignIssueSchema = new Schema(
  {
    issue: {type: ObjectId, ref: 'issues'},
    assignee: {type: ObjectId, ref: 'users'},
  },
  {
    collection: 'assignIssues',
    timestamps: true,
  },
);

const AssignIssueModel = mongoose.model("assignIssues", AssignIssueSchema);

export default AssignIssueModel;