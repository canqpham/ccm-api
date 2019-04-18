const mongoose = require('mongoose');

const { Schema } = mongoose;
// const { ObjectId } = mongoose.Types;

const IssueStatusSchema = new Schema(
  {
    status: {type: String, required: true, emun: ['to do', 'in progress', 'done']}, // to do, in progress, done
    description: {type: String},
    iconUrl: {type: String}
  },
  {
    collection: 'issueStatus',
    timestamps: true,
  },
);

const IssueStatusModel = mongoose.model("issueStatus", IssueStatusSchema);

export default IssueStatusModel;