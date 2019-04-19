import Issue from '../models/issue.model';
import mongoose from "mongoose";
class IssueRepository {
  constructor() { }

  create = async (data) => {
    const issue = await Issue.create(data);
    return issue;
  }

  update = async (id, data) => {
    // console.log(id)
      await Issue.findOneAndUpdate({_id: id}, data)

      const issue = Issue.findOne({_id: id})
      // console.log(Object(issue))
      return issue
  }

  getListIssueByParams = async (data) => {
    const issues = await Issue.find(data)
    return issues
  }

  getAllIssueByProjectId = async (id) => {
    const issues = await Issue.find({project: id})
    return issues
  }

  getIssueInfo = async (id) => {
    const issue = await Issue.aggregate([
      {
        $match: {
        "_id": mongoose.Types.ObjectId(id)
        }
      },
      {
        $lookup: {
          from: 'assignIssues',
          pipeline: [
            { $match: { issue: mongoose.Types.ObjectId(id) } },
            { $project: { member: "$assignee" } },
          ],
          as: "assignees",
        },
      },
      {
        $addFields: {
          //  item: 1,
           numberOfAssignee: { $cond: { if: { $isArray: "$assignees" }, then: { $size: "$assignees" }, else: "NA"} }
        }
     },
      {
        $lookup: {
          from: 'issues',
          localField: '_id',
          foreignField: 'subTaskOfIssue',
          as: "subtaks",
        }
      }
    ])
    return issue
  }

  remove = async id => {
    const issue = await Issue.findByIdAndRemove(id)
    return issue
  }
}

export default IssueRepository;