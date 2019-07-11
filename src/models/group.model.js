const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const GroupSchema = new Schema(
  {
    project: {type: ObjectId, ref: 'projects'},
    name: {type: String, default: null},
    level: {type: Number, default: 3}
  },
  {
    collection: 'groups',
    timestamps: true,
  },
);

const GroupModel = mongoose.model("groups", GroupSchema);

export default GroupModel;