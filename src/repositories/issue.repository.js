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
          localField: '_id',
          foreignField: 'issue',
          as: "assignees",
        },
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