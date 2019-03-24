const mongoose = require('mongoose');

const { Schema } = mongoose;
// const { ObjectId } = mongoose.Types;

const GroupSchema = new Schema(
  {
    name: {type: String, default: null},
    level: {type: String, default: 3} // 1: Scrum master, 2: Product Owner, 3: Developer
  },
  {
    collection: 'groups',
    timestamps: true,
  },
);

const GroupModel = mongoose.model("Group", GroupSchema);

export default GroupModel;