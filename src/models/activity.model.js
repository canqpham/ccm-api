
const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const ActivitySchema = new Schema(
  {
    issue: {type: ObjectId, ref: 'issues'},
    content: {type: String, required: true},
  },
  {
    collection: 'activities',
    timestamps: true,
  },
);

const ActivityModel = mongoose.model("activities", ActivitySchema);

export default ActivityModel;