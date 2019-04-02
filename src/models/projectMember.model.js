const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const ProjectMemberSchema = new Schema(
  {
    member: {type: ObjectId, ref: 'users'},
    project: {type: ObjectId, ref: 'projects'},
    group: {type: ObjectId, ref: 'groups'}
  },
  {
    collection: 'projectMembers',
    timestamps: true,
  },
);

const ProjectMemberModel = mongoose.model("ProjectMember", ProjectMemberSchema);

export default ProjectMemberModel;