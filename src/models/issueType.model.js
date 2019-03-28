
const mongoose = require('mongoose');

const { Schema } = mongoose;
// const { ObjectId } = mongoose.Types;

const IssueTypeSchema = new Schema(
  {
    type: {type: String, required: true}, // story, bug, epic
    description: {type: String},
    iconUrl: {type: String}
  },
  {
    collection: 'issueTypes',
    timestamps: true,
  },
);

const IssueTypeModel = mongoose.model("IssueType", IssueTypeSchema);

export default IssueTypeModel;