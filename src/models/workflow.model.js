
const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = mongoose.ypes;

const WorkflowSchema = new Schema(
  {
    name: {type: String, required: true}, // to do, in progress, test, deploy, done or 1 2 3 4 5
    start: {type: Boolean},
    end: {type: Boolean},
    to: [{type: ObjectId, ref: 'workflow'}]
  },
  {
    collection: 'workflow',
    timestamps: true,
  },
);

const WorkflowModel = mongoose.model("Workflow", WorkflowSchema);

export default WorkflowModel;