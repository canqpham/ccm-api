import Issue from "../models/issue.model";
import mongoose from "mongoose";
import helper from '../utils/helper';

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
      }
    ]);
    return issue;
  };

  remove = async id => {
    const issue = await Issue.findByIdAndRemove(id);
    return issue;
  };
}

export default IssueRepository;
