import Version from '../models/vesion.model';
import IssueModel from '../models/issue.model';
import mongoose from 'mongoose';

class VersionRepository {
  constructor() { }

  create = async (data) => {
    const version = await Version.create(data);
    return version;
  }

  getVersion = async (data) => {
    const version = await Version.findOne(data)
    return version
  }

  update = async (id, data) => {
      await Version.findByIdAndUpdate(id, data)
      const version = await Version.findById(id)
      return version
  }

  getListVersionByParams = async (data) => {
    const versions = await Version.find(data)
    return versions
  }

  getListIssueInVersion = async id => {
    console.log(id)
    const versions = await Version.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(id),
          // active: params.active
        }
      },
      {
        $lookup: {
          from: "issues",
          localField: "_id",
          foreignField: "version",
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
          createdAt: { $first: "$createdAt" },
          endDate: { $first: "$endDate" },
          description: { $first: "$description" },
          name: { $first: "$name" },
          project: { $first: "$project" },
          startDate: { $first: "$startDate" },
          releaseDate: { $first: "$releaseDate" },
          updatedAt: { $first: "$updatedAt" }
        }
      },
       {
        $addFields: {
          issueTotal: {
            $size: "$issues"
          }
        }
      },
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
          issues: "$issues",
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
    // console.log(issues)
    return versions[0];
  };


  getListAll = async () => {
      const versions = await Version.find()
      return versions
  }

  remove = async id => {
    const version = await Version.findByIdAndRemove(id)
    return version
  }
}

export default VersionRepository;