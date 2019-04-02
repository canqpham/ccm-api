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
    workflow: [{type: ObjectId, ref: 'workflow'}],
    groups: [{type: ObjectId, ref: 'groups'}]
  },
  {
    collection: 'projects',
    timestamps: true,
  },
);

const ProjectModel = mongoose.model("Project", ProjectSchema);

export default ProjectModel;