const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const ProjectMemberSchema = new Schema(
  {
    member: {type: ObjectId, ref: 'users'},
    project: {type: ObjectId, ref: 'projects'},
    group: {type: ObjectId, ref: 'groups'},
    isSuperAdmin: {type: Boolean, default: false},
    isSupervise: {type: Boolean, default: false},
  },
  {
    collection: 'projectMembers',
    timestamps: true,
  },
);

const ProjectMemberModel = mongoose.model("projectMembers", ProjectMemberSchema);

export default ProjectMemberModel;