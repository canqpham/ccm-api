const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const GroupSchema = new Schema(
  {
    project: {type: ObjectId, ref: 'projects'},
    name: {type: String, default: null},
    level: {type: Number, default: 3} // 1: Administrator 2:Manager, 3: Developer
  },
  {
    collection: 'groups',
    timestamps: true,
  },
);

const GroupModel = mongoose.model("groups", GroupSchema);

export default GroupModel;