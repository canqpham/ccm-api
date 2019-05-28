
const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const StoryPointSchema = new Schema(
  {
    point: {type: Number, required: true},
    project: {type: ObjectId, ref: 'projects'}
  },
  {
    collection: 'storyPoints',
    timestamps: true,
  },
);

const StoryPointModel = mongoose.model("storyPoints", StoryPointSchema);

export default StoryPointModel;