
const mongoose = require('mongoose');

const { Schema } = mongoose;
// const { ObjectId } = mongoose.Types;

const ProjectTypeSchema = new Schema(
  {
    name: {type: String, required: true},
    description: {type: String},
  },
  {
    collection: 'projectTypes',
    timestamps: true,
  },
);

const ProjectTypeModel = mongoose.model("projectTypes", ProjectTypeSchema);

export default ProjectTypeModel;