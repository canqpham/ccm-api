
const mongoose = require('mongoose');

const { Schema } = mongoose;
// const { ObjectId } = mongoose.Types;

const PrioritySchema = new Schema(
  {
    name: {type: String, required: true}, // very high, high, medium, low
    level: {type: Number, required: true}, // 0: very high, 1: high, 2: medium, 3: low 
    iconUrl: {type: String}
  },
  {
    collection: 'priorities',
    timestamps: true,
  },
);

const PriorityModel = mongoose.model("Priority", PrioritySchema);

export default PriorityModel;