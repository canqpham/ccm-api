
const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const SersionSchema = new Schema(
  {
    // sprint: {type: ObjectId, ref: 'sprints'},
    project: {type: ObjectId, ref: 'projects'},
    name: {type: String, required: true}, // to do, in progress, test, deploy, done or 1 2 3 4 5
    // start: {type: Boolean},
    // end: {type: Boolean},
    status: [{type: String, enum: ['RELEASED', 'UNRELEASED']}],
    startDate: [{type: Date}],
    releaseDate: {type: Date},
    description: {type: String},
  },
  {
    collection: 'versions',
    timestamps: true,
  },
);

const VersionModel = mongoose.model("versions", SersionSchema);

export default VersionModel;