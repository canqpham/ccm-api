
const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const VersionSchema = new Schema(
  {
    // sprint: {type: ObjectId, ref: 'sprints'},
    project: {type: ObjectId, ref: 'projects'},
    name: {type: String, required: true}, // to do, in progress, test, deploy, done or 1 2 3 4 5
    // start: {type: Boolean},
    // end: {type: Boolean},
    releaser: {type: ObjectId, ref: "users"},
    released: {type: Boolean, default: false},
    status: {type: String, enum: ['RELEASED', 'UNRELEASED'], default: "UNRELEASED"},
    startDate: {type: Date},
    releaseDate: {type: Date},
    description: {type: String},
  },
  {
    collection: 'versions',
    timestamps: true,
  },
);

const VersionModel = mongoose.model("versions", VersionSchema);

export default VersionModel;