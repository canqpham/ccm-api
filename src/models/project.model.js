const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const ProjectSchema = new Schema(
  {
    name: {type: String, default: null},
    key: {type: String, default: null},
    lead: {type: ObjectId, ref: 'users', required: true},
    projectType: {type: ObjectId, ref: 'projectTypes'},
    webUrl: {type: String},
    description: {type: String, default: null},
    sprintRange: {type: Number, default: 14}
  },
  {
    collection: 'projects',
    timestamps: true,
  },
);

const ProjectModel = mongoose.model("projects", ProjectSchema);

export default ProjectModel;