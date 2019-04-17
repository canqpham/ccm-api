
const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const SprintSchema = new Schema(
  {
    name: {type: String, required: true}, // story, bug, epic
    project: {type: ObjectId, ref: 'projects'},
    sequence: {type: Number}, // 1 2 3 4 5 6
    goal: {type: String},
    daysRemaining: {type: Number},
    endDate: {type: Date},
    startDate: {type: Date},
    completeDate: {type: Date},
    actualDays: {type: String},
    active: {type: Boolean, default: false},
    completed: {type: Boolean, default: false}
  },
  {
    collection: 'sprints',
    timestamps: true,
  },
);

const SprintModel = mongoose.model("sprints", SprintSchema);

export default SprintModel;