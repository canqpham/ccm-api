const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = mongoose.Types;

const ProjectSchema = new Schema(
  {
    name: {type: String, default: null},
    key: {type: String, default: null},
    lead: {type: ObjectId, ref: 'users', required: true},
    // lead: {type: ObjectId, ref: 'users', required},
    description: {type: String, default: null},
    members: [
        {
          member: {type: ObjectId, ref: 'users'},
          group: {type: ObjectId, ref: 'groups'}
        }
    ]
  },
  {
    collection: 'projects',
    timestamps: true,
  },
);

const ProjectModel = mongoose.model("Project", ProjectSchema);

export default ProjectModel;