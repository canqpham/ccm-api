import Issue from "../models/issue.model";
import mongoose from "mongoose";
import helper from '../utils/helper';
import ProjectModel from "../models/project.model";
import ProjectMemberModel from "../models/projectMember.model";

class IssueRepository {
  constructor() {}

  create = async data => {
    const issue = await Issue.create(data);
    return issue;
  };

  update = async (id, data) => {
    // console.log(id)
    await Issue.findOneAndUpdate({ _id: id }, data);

    const issue = Issue.findOne({ _id: id });
    // console.log(Object(issue))
    return issue;
  };

  getListIssueByParams = async (data) => {
    const result = await Issue.find(data)
    return result
  }

  getListByParams = async (params) => {
    const [result, count] = await helper.getListItem(Issue, params)
    return [result, count]
}

  getAllIssueByProjectId = async id => {
    const issues = await Issue.find({ project: id });
    return issues;
  };

  getIssueInfo = async id => {
    const issue = await Issue.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(id)
        }
      },
      {
        $lookup: {
          from: 'workflow',
          localField: "workflow",
          foreignField: "_id",
          as: 'workflow'
        },
      },
      {
        $addFields: { 
          workflow: {
            $arrayElemAt: [ '$workflow', 0 ]
          }
        }
      },
      {
        $lookup: {
          from: "assignIssues",
          pipeline: [
            { $match: { issue: mongoose.Types.ObjectId(id) } },
            { $project: { member: "$assignee" } }
          ],
          as: "assignees"
        }
      },
      {
        $addFields: {
          //  item: 1,
          numberOfAssignee: {
            $cond: {
              if: { $isArray: "$assignees" },
              then: { $size: "$assignees" },
              else: "NA"
            }
          }
        }
      },
      {
        $lookup: {
          from: "issues",
          localField: "_id",
          foreignField: "subTaskOfIssue",
          as: "subtaks"
        }
      },
      {
        $lookup: {
          from: "comments",
          pipeline: [
            { $match: { issue: mongoose.Types.ObjectId(id) } },
            {
              $project: {
                creator: "$creator",
                content: "$content",
                image: "$image",
                attach: "$attach",
                tagMembers: "$tagMembers",
                tagIssues: "$tagIssues"
              }
            }
          ],
          as: "comments"
        }
      },
      {
        $lookup: {
          from: "activities",
          pipeline: [
            { $match: { issue: mongoose.Types.ObjectId(id) } },
            { $sort: { createdAt: -1}}
          ],
          as: "activities"
        }
      }
    ]);
    // let result  = issue.populate('workflow')
    return issue;
  };

  remove = async id => {
    const issue = await Issue.findByIdAndRemove(id);
    return issue;
  };

  getListProjectDashboard = async userId => {
    const results = await ProjectMemberModel.aggregate([
      {
        $match: {
          member: mongoose.Types.ObjectId(userId)
        }
      },
      {
        $lookup: {
          from: "projects",
          localField: "project",
          foreignField: "_id",
          as: "project"
        }
      },
      {
        $unwind: "$project"
      },
      {
        $lookup: {
          from: "issues",
          localField: "project._id",
          foreignField: "project",
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
          issues: { $push: "$issues"},
          project: { $first: "$project" }
        }
      },
      {
        $project:  {
          project: "$project",
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
            },
          }
        }
      }
    ])
    return [results, {}];
  }
}

export default IssueRepository;
