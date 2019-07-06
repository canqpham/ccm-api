import Sprint from "../models/sprints.model";
import mongoose, { Query } from "mongoose";

class SprintRepository {
  constructor() { }

  create = async data => {
    const sprint = await Sprint.create(data);
    return sprint;
  };

  getSprintByParams = async data => {
    const sprint = await Sprint.findOne(data);
    return sprint;
  }

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
    return sprint[0];
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
          from: "issueTypes",
          localField: "issues.issueType",
          foreignField: "_id",
          // pipeline: [
          //   { $match: { "_id": "$issues.issueType" } },
          //   { $project: { iconUrl: "$iconUrl" } }
          // ],
          as: "issues.issueType"
        }
      },
      {
        $unwind: {
          path: "$issueType",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "priorities",
          localField: "issues.priority",
          foreignField: "_id",
          // pipeline: [
          //   { $match: { "_id": "$issues.issueType" } },
          //   { $project: { iconUrl: "$iconUrl" } }
          // ],
          as: "issues.priority"
        }
      },
      {
        $unwind: {
          path: "$priority",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "issues.assignee",
          foreignField: "_id",
          // pipeline: [
          //   { $match: { "_id": "$issues.issueType" } },
          //   { $project: { iconUrl: "$iconUrl" } }
          // ],
          as: "issues.assignee"
        }
      },
      {
        $addFields: {
          "issues.issueType": {
            $arrayElemAt: ['$issues.issueType', 0]
          },
          "issues.priority": {
            $arrayElemAt: ['$issues.priority', 0]
          }
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
      {
        $group: {
          _id: "$workflow._id",
          issues: { $push: "$issues" },
          workflow: { $first: "$workflow" }
        }
      }
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
    return sprint[0];
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
          completed: params.completed
          // active: params.active
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
          localField: "issues.workflow",
          foreignField: "_id",
          as: "issues.workflow"
        }
      },
      {
        $unwind: {
          path: "$issues.workflow",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $group: {
          _id: "$_id",
          issues: { $push: "$issues" },
          active: { $first: "$active" },
          completed: { $first: "$completed" },
          createdAt: { $first: "$createdAt" },
          endDate: { $first: "$endDate" },
          goal: { $first: "$goal" },
          name: { $first: "$name" },
          project: { $first: "$project" },
          startDate: { $first: "$startDate" },
          updatedAt: { $first: "$updatedAt" }
        }
      },
      //  {
      //   $addFields: {
      //     issueTotal: {
      //       $size: "$issues"
      //     }
      //   }
      // },
      {
        $project: {
          active: "$active",
          issueTotal: "$issueTotal",
          completed: "$completed",
          createdAt: "$createdAt",
          endDate: "$endDate",
          goal: "$goal",
          name: "$name",
          project: "$project",
          startDate: "$startDate",
          updatedAt: "$updatedAt",
          count: {
            toDo: {
              $size: {
                $filter: {
                  input: "$issues",
                  as: "issue",
                  cond: { $eq: ["$$issue.workflow.type", "TODO"] }
                }
              }
            },
            inProgress: {
              $size: {
                $filter: {
                  input: "$issues",
                  as: "issue",
                  cond: { $eq: ["$$issue.workflow.type", "INPROGRESS"] }
                }
              }
            },
            done: {
              $size: {
                $filter: {
                  input: "$issues",
                  as: "issue",
                  cond: { $eq: ["$$issue.workflow.type", "DONE"] }
                }
              }
            }
          }
        }
      },
      {
        $sort: {
          sequence: -1,
          createdAt: 1
        }
      },

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
