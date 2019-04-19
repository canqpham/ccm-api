
const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const WorkflowSchema = new Schema(
  {
    sprint: {type: ObjectId, ref: 'sprints'},
    project: {type: ObjectId, ref: 'projects'},
    name: {type: String, required: true}, // to do, in progress, test, deploy, done or 1 2 3 4 5
    // start: {type: Boolean},
    // end: {type: Boolean},
    from: [{type: ObjectId, ref: 'workflow'}],
    to: [{type: ObjectId, ref: 'workflow'}],
    linkAll: {type: Boolean, default: true},
    sequence: {type: Number}, // 1 2 3 4 5 6 ...
  },
  {
    collection: 'workflow',
    timestamps: true,
  },
);

const WorkflowModel = mongoose.model("workflow", WorkflowSchema);

export default WorkflowModel;