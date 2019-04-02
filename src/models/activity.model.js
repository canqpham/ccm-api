
const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const ActivitySchema = new Schema(
  {
    withPeople: {type: Boolean},
    withIssue: {type: Boolean},
    content: {type: String, required: true},
    creator: {type: ObjectId, ref: 'users'},
    issue: {type: ObjectId, ref: 'issues'},
  },
  {
    collection: 'activities',
    timestamps: true,
  },
);

const ActivityModel = mongoose.model("Activity", ActivitySchema);

export default ActivityModel;