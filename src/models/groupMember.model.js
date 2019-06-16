const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const GroupMemberSchema = new Schema(
  {
    member: {type: ObjectId, ref: 'users'},
    group: {type: ObjectId, ref: 'groups'},
    project: {type: ObjectId, ref: 'projects'},
  },
  {
    collection: 'groupMembers',
    timestamps: true,
  },
);

const GroupMemberModel = mongoose.model("groupMembers", GroupMemberSchema);

export default GroupMemberModel;