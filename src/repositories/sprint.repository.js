import Sprint from "../models/sprints.model";
import mongoose, { Query } from "mongoose";

class SprintRepository {
  constructor() {}

  create = async data => {
    const sprint = await Sprint.create(data);
    return sprint;
  };

  update = async (id, data) => {
    await Sprint.findByIdAndUpdate(id, data);
    const sprint = await this.getSprintById(id);
    return sprint;
  };

  getSprintById = async id => {
    const sprint = await Sprint.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(id)
        }
      },
      {
        $lookup: {
          from: "issues",
          localField: "_id",
          foreignField: "sprint",
          as: "issues"
        }
        // $group: {
        //   _id: "issueStatus",
        //   count: { $sum: 1 }
        // },
      },
      {
        $lookup: {
          from: "workflow",
          localField: "_id",
          foreignField: "sprint",
          as: "boards"
        }
        // $group: {
        //   _id: "issueStatus",
        //   count: { $sum: 1 }
        // },
      },
      {
        $addFields: {
          //  item: 1,
          numberOfTodo: {
            $cond: {
              if: { $isArray: "$issues" },
              then: { $size: "$issues" },
              else: "NA"
            }
          }
        }
      }
      // {
      //   $lookup: {
      //     from: 'issues',
      //     localField: '_id',
      //     foreignField: 'sprint',

      //     as: "numberOfIssueStatus",
      //   }
      // }
    ]);
    return sprint;
  };

  getListWorkflowByProject = async id => {
    const workflow = await Sprint.aggregate([
      {
        $match: {
          project: mongoose.Types.ObjectId(id),
          active: true
        }
      },
      {
        $lookup: {
          from: "issues",
          localField: "_id",
          foreignField: "sprint",
          as: "issues"
        }
      },
      {
        $unwind: {
          path: "$issues",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "workflow",
          localField: "project",
          foreignField: "project",
          as: "workflow"
        }
      },
      {
        $unwind: {
          path: "$workflow",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $match: {
          $expr: {
            $eq: ["$workflow._id", "$issues.workflow"]
          }
        }
      },
      // {
      //   $redact: {
      //       $cond: [
      //           {
      //             $gt: [ "$issues.workflow", "$workflow._id" ]
      //           },
      //           "$$KEEP",
      //           "$$PRUNE"
      //       ]
      //   }
      // }
      // {
      //   $match: {
      //     "workflow._id": "$issues.workflow"
      //   }
      // },
      {
        $group: {
          _id: "$workflow._id",
          issues: { $push: "$issues" },
          workflow: { $first: "$workflow" }
        }
      },
      // {
      //   $redact: {
      //     $cond: {
      //       if: {
      //         $eq: ["$issues.workflow", "_id"]
      //       },
      //       then: "$$DESCEND",
      //       else: "$$PRUNE"
      //     }
      //   }
      // }
    ]);
    return workflow;
  };

  getSprintActiveInProject = async data => {
    const sprint = await Sprint.aggregate([
      {
        $match: {
          project: mongoose.Types.ObjectId(data.project),
          active: data.active
        }
      },
      {
        $lookup: {
          from: "issues",
          localField: "_id",
          foreignField: "sprint",
          as: "issues"
        }
        // $group: {
        //   _id: "issueStatus",
        //   count: { $sum: 1 }
        // },
      },
      {
        $lookup: {
          from: "workflow",
          localField: "_id",
          foreignField: "sprint",
          as: "boards"
        }
        // $group: {
        //   _id: "issueStatus",
        //   count: { $sum: 1 }
        // },
      },
      {
        $addFields: {
          //  item: 1,
          numberOfTodo: {
            $cond: {
              if: { $isArray: "$issues" },
              then: { $size: "$issues" },
              else: "NA"
            }
          }
        }
      }
      // {
      //   $lookup: {
      //     from: 'issues',
      //     localField: '_id',
      //     foreignField: 'sprint',

      //     as: "numberOfIssueStatus",
      //   }
      // }
    ]);
    return sprint;
  };

  getListAll = async () => {
    const sprints = await Sprint.find();
    return sprints;
  };

  getListSprintByParams = async data => {
    const sprints = await Sprint.find(data);
    return sprints;
  };

  getListSprintNotCompleted = async params => {
    const sprints = await Sprint.aggregate([
      {
        $match: {
          project: mongoose.Types.ObjectId(params.project),
          completed: params.completed,
          // active: params.active
        }
      }
    ]);
    // console.log(sprints)
    return sprints;
  };

  remove = async id => {
    const sprint = await Sprint.findByIdAndRemove(id);
    return sprint;
  };
}

export default SprintRepository;
