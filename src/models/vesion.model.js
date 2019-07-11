
const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const VersionSchema = new Schema(
  {
    project: {type: ObjectId, ref: 'projects'},
    name: {type: String, required: true},
    releaser: {type: ObjectId, ref: "users"},
    unreleaser: {type: ObjectId, ref: "users"},
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