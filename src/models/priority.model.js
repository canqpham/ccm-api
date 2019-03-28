
const mongoose = require('mongoose');

const { Schema } = mongoose;
// const { ObjectId } = mongoose.Types;

const PrioritySchema = new Schema(
  {
    name: {type: String, required: true}, // story, bug, epic
    iconUrl: {type: String}
  },
  {
    collection: 'priorities',
    timestamps: true,
  },
);

const PriorityModel = mongoose.model("Priority", PrioritySchema);

export default PriorityModel;