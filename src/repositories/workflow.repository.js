import Workflow from "../models/workflow.model";
import mongoose from "mongoose";
class WorkflowRepository {
  constructor() {}

  create = async data => {
    const workflow = await Workflow.create(data);
    return workflow;
  };

  getWorkflow = async data => {
    // console.log('Query', data)
    const workflow = await Workflow.findOne(data);
    return workflow;
  };

  update = async (id, data) => {
    await Workflow.findByIdAndUpdate(id, data);
    const workflow = await Workflow.findById(id);
    return workflow;
  };

  getListByParams = async data => {
    const workflows = await Workflow.find(data);
    return workflows;
  };

  getListByProject = async id => {
    const workflows = await Workflow.aggregate([
      {
        $match: {
          project: mongoose.Types.ObjectId(id)
        }
      },
      {
        $sort: {
          sequence: 1
        }
      }
      // {
      //   $lookup: {
      //     from: "issues",
      //     localField: "_id",
      //     foreignField: "workflow",
      //     as: "issues"
      //   }
      // },
      // {
      //   $unwind: {
      //     path: "$issues",
      //     preserveNullAndEmptyArrays: true
      //   }
      // },
      // {
      //   $lookup: {
      //     from: "sprints",
      //     localField: "issues.sprint",
      //     foreignField: "_id",
      //     as: "sprint"
      //   }
      // },

      // {
      //   $unwind: {
      //     path: "$sprint",
      //     preserveNullAndEmptyArrays: true
      //   }
      // },

      // {
      //   $match: {
      //     "sprint.active": true
      //   }
      // }
      // {
      //   $group: {
      //     _id: "$_id",
      //   }
      // }
    ]);
    return workflows;
  };

  getListAll = async () => {
    const workflows = await Workflow.find();
    return workflows;
  };

  remove = async id => {
    const workflow = await Workflow.findByIdAndRemove(id);
    return workflow;
  };
}

export default WorkflowRepository;
