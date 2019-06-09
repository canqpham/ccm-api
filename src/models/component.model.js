

const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const ComponentSchema = new Schema(
  {
    project: {type: ObjectId, ref: 'projects'},
    name: {type: String, required: true},
    lead: {type: ObjectId, ref: 'users'},
    description: {type: String},
  },
  {
    collection: 'components',
    timestamps: true,
  },
);

const ComponentModel = mongoose.model("components", ComponentSchema);

export default ComponentModel;