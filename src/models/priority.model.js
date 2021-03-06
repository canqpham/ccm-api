
const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const PrioritySchema = new Schema(
  {
    project: {type: ObjectId, ref: "projects"},
    name: {type: String, required: true}, // very high, high, medium, low
    level: {type: Number, required: true}, // 0: very high, 1: high, 2: medium, 3: low 
    iconUrl: {type: String}
  },
  {
    collection: 'priorities',
    timestamps: true,
  },
);

const PriorityModel = mongoose.model("priorities", PrioritySchema);

export default PriorityModel;