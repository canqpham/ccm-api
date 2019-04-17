
const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const LabelSchema = new Schema(
  {
    name: {type: String, required: true}, // story, bug, epic, subTask
    color: {type: String},
    project: {type: ObjectId, ref: 'projects'}
  },
  {
    collection: 'labels',
    timestamps: true,
  },
);

const LabelModel = mongoose.model("labels", LabelSchema);

export default LabelModel;